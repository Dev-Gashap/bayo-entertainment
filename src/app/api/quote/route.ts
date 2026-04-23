import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const client = new Anthropic();

const QUOTE_SYSTEM = `You are the Smart Quote Generator for Bayo Entertainment — the premier saxophonist booking platform. Bayo is based in Houston, Texas and performs worldwide.

Your job is to generate detailed, professional event quotes based on the event details a client provides. You return a structured JSON quote, not conversational text.

# PACKAGES (starting points)
1. **Intimate** — $1,500 base (solo sax, up to 2 hours, local travel included)
2. **Premium** — $3,500 base (solo + DJ collaboration, up to 4 hours, full production)
3. **Headline** — $8,000+ base (full band, multi-hour, stage production, sound engineering team)

# PRICING RULES
- Base package price is a starting point — adjust based on duration, complexity, and add-ons.
- Travel outside Houston metro: add $500-$2,500 for US domestic (based on distance & accommodation)
- International travel: add $3,000-$8,000 depending on region and duration
- Additional performance hours: $400/hour beyond the package base
- Band members (for Headline): $800 per additional musician for the event
- Custom song arrangements: $250 per requested custom arrangement
- Extended production (LED walls, pyro, etc.): quoted separately — recommend Headline package
- Weekend/peak dates (Fri/Sat, holidays): +15% premium

# QUOTE STRUCTURE
Generate a quote with:
- Recommended package (based on event type and scale)
- Base price
- Line items for any add-ons (travel, extra hours, custom arrangements, etc.)
- Subtotal
- Estimated total (as a range, low to high)
- 3-5 specific notes/recommendations tailored to the event
- A friendly headline message and closing line

Be generous with the range — give a reasonable low/high spread to account for variables like exact travel costs and custom requests. Never promise exact final prices.`;

const QUOTE_SCHEMA = {
  type: "object",
  properties: {
    headline: {
      type: "string",
      description: "Warm 1-line greeting tailored to the event (e.g. 'Wedding magic in Atlanta — here's your quote').",
    },
    recommended_package: {
      type: "string",
      enum: ["Intimate", "Premium", "Headline"],
      description: "Which base package best fits this event.",
    },
    package_reason: {
      type: "string",
      description: "One-sentence explanation of why this package is the right fit.",
    },
    base_price: {
      type: "number",
      description: "Base package price in USD.",
    },
    line_items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          label: { type: "string", description: "Add-on name (e.g. 'Travel to Miami', 'Extra performance hour')." },
          price: { type: "number", description: "Price in USD." },
        },
        required: ["label", "price"],
        additionalProperties: false,
      },
      description: "Line items for travel, extra hours, custom arrangements, etc. Can be empty.",
    },
    subtotal: {
      type: "number",
      description: "Sum of base_price + all line_items.",
    },
    estimated_range: {
      type: "object",
      properties: {
        low: { type: "number", description: "Low end of estimated total in USD." },
        high: { type: "number", description: "High end of estimated total in USD." },
      },
      required: ["low", "high"],
      additionalProperties: false,
    },
    notes: {
      type: "array",
      items: { type: "string" },
      description: "3-5 specific, tailored recommendations or notes for this event.",
    },
    closing: {
      type: "string",
      description: "Warm, professional closing line (e.g. 'We'd be honored to make your wedding unforgettable — reach out to lock in the date').",
    },
  },
  required: [
    "headline",
    "recommended_package",
    "package_reason",
    "base_price",
    "line_items",
    "subtotal",
    "estimated_range",
    "notes",
    "closing",
  ],
  additionalProperties: false,
};

interface QuoteRequest {
  event_type: string;
  event_date: string;
  location: string;
  guests: string;
  duration: string;
  details: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as QuoteRequest;

    const userMessage = `Generate a quote for this event:

- Event type: ${body.event_type || "Not specified"}
- Event date: ${body.event_date || "Not specified"}
- Location: ${body.location || "Not specified"}
- Estimated guests: ${body.guests || "Not specified"}
- Preferred duration: ${body.duration || "Not specified"}
- Additional details: ${body.details || "None provided"}

Return a detailed quote in the structured format.`;

    const response = await client.messages.create({
      model: "claude-opus-4-7",
      max_tokens: 4000,
      thinking: { type: "adaptive" },
      output_config: {
        effort: "medium",
        format: { type: "json_schema", schema: QUOTE_SCHEMA },
      },
      cache_control: { type: "ephemeral" },
      system: QUOTE_SYSTEM,
      messages: [{ role: "user", content: userMessage }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return Response.json({ error: "No quote generated" }, { status: 500 });
    }

    const quote = JSON.parse(textBlock.text);
    return Response.json({ quote });
  } catch (err) {
    if (err instanceof Anthropic.APIError) {
      return Response.json({ error: err.message }, { status: err.status ?? 500 });
    }
    const message = err instanceof Error ? err.message : "Internal error";
    return Response.json({ error: message }, { status: 500 });
  }
}
