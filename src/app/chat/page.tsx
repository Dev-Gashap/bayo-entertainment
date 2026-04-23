"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Send,
  Paperclip,
  Smile,
  Phone,
  MoreVertical,
  Check,
  CheckCheck,
  Clock,
  Calendar,
  MapPin,
  DollarSign,
  Headphones,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { cn } from "@/lib/utils";

/* ─── Types ─── */
interface Message {
  id: string;
  sender: "user" | "agent";
  text: string;
  time: string;
  status?: "sending" | "sent" | "delivered" | "read";
}

/* ─── Quick action suggestions ─── */
const quickActions = [
  { icon: <Calendar className="h-3.5 w-3.5" />, label: "Check availability", message: "Hi! I'd like to check Bayo's availability for an upcoming event." },
  { icon: <DollarSign className="h-3.5 w-3.5" />, label: "Get pricing", message: "I'm interested in booking Bayo. Can you share your pricing packages?" },
  { icon: <MapPin className="h-3.5 w-3.5" />, label: "Book an event", message: "I'd like to book Bayo for an event. Can we discuss the details?" },
  { icon: <Headphones className="h-3.5 w-3.5" />, label: "Song requests", message: "Can Bayo play specific songs at my event? I have a list I'd love to share." },
];

/* ─── Automated agent responses ─── */
const agentResponses: Record<string, string[]> = {
  availability: [
    "Thanks for reaching out! 🎷 Bayo is currently booking for events through 2026.",
    "Could you share the date you have in mind and the city/location? I'll check his calendar right away.",
  ],
  pricing: [
    "Great question! Our packages start at:",
    "• Intimate (solo sax, 2hrs): $1,500\n• Premium (full set, 4hrs): $3,500\n• Headline (concert/gala): Custom quote",
    "The final price depends on your event type, location, and duration. Want me to put together a custom quote for you?",
  ],
  booking: [
    "Awesome, let's get you booked! 🎵",
    "To get started, I'll need a few details:\n\n1. Event date\n2. Event type (wedding, corporate, party, etc.)\n3. Location (city & venue if known)\n4. Estimated guest count\n5. Any special requests",
    "Feel free to share whatever you have and we'll work out the rest!",
  ],
  songs: [
    "Absolutely! Bayo can play a wide range of genres on saxophone:",
    "🎶 Jazz, R&B, Afrobeats, Gospel, Highlife, Amapiano, Pop, Soul, and more.",
    "Send over your song list and we'll let you know which ones Bayo can perform. He also takes requests during live shows!",
  ],
  default: [
    "Thanks for your message! A member of Bayo's team will respond shortly.",
    "In the meantime, you can also:\n\n• Call us: +1 (832) 555-BAYO\n• Email: hello@bayoentertainment.com\n• Book online: bayoentertainment.com/book",
  ],
};

function getAgentResponse(message: string): string[] {
  const lower = message.toLowerCase();
  if (lower.includes("availability") || lower.includes("available") || lower.includes("date") || lower.includes("when")) {
    return agentResponses.availability;
  }
  if (lower.includes("pricing") || lower.includes("price") || lower.includes("cost") || lower.includes("how much") || lower.includes("package")) {
    return agentResponses.pricing;
  }
  if (lower.includes("book") || lower.includes("reserve") || lower.includes("hire") || lower.includes("event")) {
    return agentResponses.booking;
  }
  if (lower.includes("song") || lower.includes("play") || lower.includes("request") || lower.includes("genre") || lower.includes("music")) {
    return agentResponses.songs;
  }
  return agentResponses.default;
}

function getTimeString() {
  return new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

/* ─── Page ─── */
export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "agent",
      text: "Welcome to Bayo Entertainment! 🎷✨",
      time: getTimeString(),
      status: "read",
    },
    {
      id: "welcome-2",
      sender: "agent",
      text: "I'm here to help with bookings, pricing, availability, and any questions about Bayo's performances. How can I assist you today?",
      time: getTimeString(),
      status: "read",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const msgIdRef = useRef(0);
  const nextId = () => {
    msgIdRef.current += 1;
    return `msg-${msgIdRef.current}`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: nextId(),
      sender: "user",
      text: text.trim(),
      time: getTimeString(),
      status: "sent",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Update to delivered
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => m.id === userMsg.id ? { ...m, status: "delivered" } : m)
      );
    }, 500);

    // Update to read
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => m.id === userMsg.id ? { ...m, status: "read" } : m)
      );
      setIsTyping(true);
    }, 1000);

    // Agent responses
    const responses = getAgentResponse(text);
    responses.forEach((response, i) => {
      setTimeout(() => {
        if (i === responses.length - 1) setIsTyping(false);
        const agentMsg: Message = {
          id: nextId(),
          sender: "agent",
          text: response,
          time: getTimeString(),
          status: "read",
        };
        setMessages((prev) => [...prev, agentMsg]);
      }, 1500 + i * 1200);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="min-h-screen bg-[#0d0b08] text-cream flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full pt-20">
        {/* Chat header */}
        <div className="border-b border-gold/10 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-cream/30 hover:text-gold transition-colors sm:hidden">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="relative">
                <div className="h-11 w-11 overflow-hidden border border-gold/20">
                  <Image
                    src="/images/closeup.jpeg"
                    alt="Bayo"
                    width={44}
                    height={44}
                    className="object-cover object-top w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 bg-emerald-500 border-2 border-[#0d0b08] rounded-full" />
              </div>
              <div>
                <h2 className="font-bold text-sm flex items-center gap-2">
                  Bayo&apos;s Team
                  <svg className="h-4 w-4 text-gold" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0l2.1 5.3L16 6.2l-4 3.8 1 5.9L8 13l-5 2.9 1-5.9-4-3.8 5.9-.9z" />
                  </svg>
                </h2>
                <p className="text-[10px] text-emerald-400 tracking-wider uppercase flex items-center gap-1">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  Online — Usually replies instantly
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="h-9 w-9 flex items-center justify-center text-cream/30 hover:text-gold transition-colors cursor-pointer"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Info panel */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-gold/5 grid grid-cols-3 gap-3">
                  <a href="tel:+18325552296" className="flex flex-col items-center gap-2 py-3 border border-gold/10 hover:border-gold/30 hover:bg-gold/5 transition-all">
                    <Phone className="h-4 w-4 text-gold" />
                    <span className="text-[10px] text-cream/40 tracking-wider uppercase">Call</span>
                  </a>
                  <Link href="/book" className="flex flex-col items-center gap-2 py-3 border border-gold/10 hover:border-gold/30 hover:bg-gold/5 transition-all">
                    <Calendar className="h-4 w-4 text-gold" />
                    <span className="text-[10px] text-cream/40 tracking-wider uppercase">Book</span>
                  </Link>
                  <Link href="/reviews" className="flex flex-col items-center gap-2 py-3 border border-gold/10 hover:border-gold/30 hover:bg-gold/5 transition-all">
                    <Star className="h-4 w-4 text-gold" />
                    <span className="text-[10px] text-cream/40 tracking-wider uppercase">Reviews</span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-4">
          {/* Date separator */}
          <div className="flex items-center justify-center">
            <span className="px-4 py-1 bg-gold/5 border border-gold/10 text-[10px] text-cream/25 tracking-wider uppercase">
              Today
            </span>
          </div>

          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={cn("flex", msg.sender === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[80%] sm:max-w-[70%] px-4 py-3 relative",
                  msg.sender === "user"
                    ? "bg-gold/10 border border-gold/15"
                    : "bg-white/[0.03] border border-white/5"
                )}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap text-cream/80">{msg.text}</p>
                <div className={cn("flex items-center gap-1.5 mt-1.5", msg.sender === "user" ? "justify-end" : "justify-start")}>
                  <span className="text-[9px] text-cream/20">{msg.time}</span>
                  {msg.sender === "user" && msg.status && (
                    <span className="text-cream/20">
                      {msg.status === "sending" && <Clock className="h-3 w-3" />}
                      {msg.status === "sent" && <Check className="h-3 w-3" />}
                      {msg.status === "delivered" && <CheckCheck className="h-3 w-3" />}
                      {msg.status === "read" && <CheckCheck className="h-3 w-3 text-gold" />}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex justify-start"
              >
                <div className="bg-white/[0.03] border border-white/5 px-5 py-3.5">
                  <div className="flex gap-1.5 items-center">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                          className="h-2 w-2 rounded-full bg-gold/40"
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-cream/20 ml-2">typing...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Quick actions — only show if few messages */}
        {messages.length <= 3 && (
          <div className="px-4 sm:px-6 pb-3">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => sendMessage(action.message)}
                  className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 border border-gold/10 hover:border-gold/30 hover:bg-gold/5 text-cream/40 hover:text-gold transition-all cursor-pointer"
                >
                  {action.icon}
                  <span className="text-[11px] tracking-wider uppercase font-medium whitespace-nowrap">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="border-t border-gold/10 px-4 sm:px-6 py-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <button type="button" className="h-10 w-10 flex items-center justify-center text-cream/20 hover:text-gold transition-colors cursor-pointer flex-shrink-0">
              <Paperclip className="h-5 w-5" />
            </button>
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-5 py-3 bg-white/[0.03] border border-gold/10 text-cream placeholder-cream/20 focus:outline-none focus:border-gold/30 transition-colors text-sm pr-12"
              />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/15 hover:text-gold transition-colors cursor-pointer">
                <Smile className="h-5 w-5" />
              </button>
            </div>
            <button
              type="submit"
              disabled={!input.trim()}
              className={cn(
                "h-10 w-10 flex items-center justify-center transition-all cursor-pointer flex-shrink-0",
                input.trim()
                  ? "bg-gold text-charcoal hover:shadow-lg hover:shadow-gold/20"
                  : "bg-gold/10 text-cream/15 cursor-not-allowed"
              )}
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <p className="text-[9px] text-cream/10 text-center mt-2 tracking-wider">
            Powered by Bayo Entertainment &bull; Response times may vary
          </p>
        </div>
      </div>
    </div>
  );
}
