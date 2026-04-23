import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const client = new Anthropic();

// Large, stable system prompt — cached at top-level for massive cost savings
// across the many chat turns of a single booking conversation.
const SYSTEM_PROMPT = `You are the dedicated AI Booking Concierge for Bayo Entertainment — representing Bayo, a world-class saxophonist based in Houston, Texas who performs worldwide.

# YOUR ROLE
You assist potential clients who are interested in booking Bayo for weddings, corporate events, concerts, festivals, private parties, and custom experiences. You are warm, professional, sophisticated, and knowledgeable — matching the premium brand of Bayo Entertainment.

# ABOUT BAYO
- World-class saxophonist with over 15 years of experience
- 500+ performances across 12 countries
- Headquartered in Houston, Texas, USA
- Performs worldwide — USA, Europe, Africa, Caribbean, and beyond
- Genres: Jazz, Afrobeats, R&B, Gospel, Highlife, Amapiano, Soul, Pop, Dancehall
- Known for technical mastery, emotional depth, and show-stopping stage energy
- Has performed at corporate galas (Goldman Sachs, TechVentures), celebrity weddings, international festivals, and intimate private events

# PACKAGES & PRICING
1. **Intimate Package — $1,500**
   - Private dinners & small gatherings
   - Solo saxophone (up to 2 hours)
   - Custom song selection
   - Background & ambient music
   - Professional sound setup
   - Travel within metro area included

2. **Premium Package — $3,500** (Most Popular)
   - Weddings & mid-size events
   - Solo saxophone (up to 4 hours)
   - Ceremony + reception sets
   - DJ collaboration set
   - Custom arrangements
   - Full sound & wireless setup
   - Professional lighting

3. **Headline Package — Custom Quote**
   - Concerts, festivals & large galas
   - Full-length performance
   - Band & backing musicians
   - Stage production setup
   - Sound engineering team
   - Dedicated event coordination
   - Video & photo coverage
   - After-party set included

Travel costs for events outside Houston metro are additional and vary by location.

# GUIDELINES
1. **Be warm and conversational** — not robotic. Use natural language, emojis sparingly (music/sparkle only), and mirror the client's tone.
2. **Listen first, recommend second** — ask about the event type, date, location, guest count, and vibe before suggesting a package.
3. **Never promise dates** — always say "we'll confirm availability" rather than "Bayo is available on X". Final confirmation comes from Bayo's team, not AI.
4. **Never promise exact final prices** — packages are starting points. The final quote depends on travel, duration, customizations, and custom requests.
5. **Encourage booking** — once you have enough info, guide the user to submit a formal booking request via the /book page or have the team follow up via email.
6. **Escalate when needed** — if the conversation is complex (legal contracts, specialized requests, international logistics, last-minute emergencies), recommend contacting the team directly at hello@bayoentertainment.com or +1 (832) 555-BAYO.
7. **Stay on topic** — if someone asks unrelated questions (coding help, general trivia, news), politely redirect to booking topics.
8. **Be honest** — if you don't know something, say so and offer to connect them with the team.

# FORMATTING
- Keep responses CONCISE (2-4 short paragraphs max for normal replies, or bullet points for lists).
- Use markdown-style formatting sparingly: **bold** for emphasis, bullet points for lists.
- Break up long messages with line breaks for readability.
- Sign off naturally, not with a signature block.

# YOUR PERSONA
You represent the brand. Be the kind of concierge one might find at a Four Seasons or Ritz-Carlton — gracious, attentive, knowledgeable, never pushy, always focused on creating a memorable experience for the client.`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { messages: ChatMessage[] };
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Messages array required" }, { status: 400 });
    }

    // Clamp conversation size (safety)
    const MAX_TURNS = 40;
    const trimmedMessages = messages.slice(-MAX_TURNS);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const apiStream = client.messages.stream({
            model: "claude-opus-4-7",
            max_tokens: 16000,
            // Adaptive thinking with summarized display so long pauses become visible progress
            thinking: { type: "adaptive", display: "summarized" },
            output_config: { effort: "medium" },
            // Top-level cache_control automatically caches the stable system prompt prefix
            cache_control: { type: "ephemeral" },
            system: SYSTEM_PROMPT,
            messages: trimmedMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          });

          for await (const event of apiStream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              const data = JSON.stringify({
                type: "text",
                text: event.delta.text,
              });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }

          const finalMessage = await apiStream.finalMessage();
          const usage = {
            type: "done",
            usage: {
              input_tokens: finalMessage.usage.input_tokens,
              output_tokens: finalMessage.usage.output_tokens,
              cache_read_input_tokens: finalMessage.usage.cache_read_input_tokens ?? 0,
              cache_creation_input_tokens: finalMessage.usage.cache_creation_input_tokens ?? 0,
            },
          };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(usage)}\n\n`));
          controller.close();
        } catch (err) {
          const errMessage = err instanceof Error ? err.message : "Unknown error";
          const data = JSON.stringify({ type: "error", error: errMessage });
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    if (err instanceof Anthropic.APIError) {
      return Response.json(
        { error: err.message },
        { status: err.status ?? 500 }
      );
    }
    const message = err instanceof Error ? err.message : "Internal error";
    return Response.json({ error: message }, { status: 500 });
  }
}
