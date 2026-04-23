"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Music,
  Check,
  MessageCircle,
  Calendar,
  MapPin,
  Users,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { cn } from "@/lib/utils";

interface Quote {
  headline: string;
  recommended_package: "Intimate" | "Premium" | "Headline";
  package_reason: string;
  base_price: number;
  line_items: { label: string; price: number }[];
  subtotal: number;
  estimated_range: { low: number; high: number };
  notes: string[];
  closing: string;
}

const EVENT_TYPES = [
  "Wedding",
  "Corporate Event / Gala",
  "Private Party",
  "Birthday Celebration",
  "Anniversary",
  "Concert / Show",
  "Festival",
  "Religious Event",
  "Other",
];

const DURATIONS = [
  "1-2 hours (intimate set)",
  "3-4 hours (ceremony + reception)",
  "5-6 hours (full event)",
  "Full day / multi-day",
];

function FadeIn({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function formatUSD(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function QuotePage() {
  const [form, setForm] = useState({
    event_type: "",
    event_date: "",
    location: "",
    guests: "",
    duration: "",
    details: "",
  });
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setQuote(null);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({ error: "Request failed" }));
        throw new Error(errData.error || "Request failed");
      }

      const data = (await res.json()) as { quote: Quote };
      setQuote(data.quote);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = form.event_type && form.event_date && form.location;

  return (
    <div className="min-h-screen bg-[#0d0b08] text-cream">
      <Navbar />

      <section className="pt-32 pb-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Link href="/" className="inline-flex items-center gap-2 text-cream/30 hover:text-gold transition-colors text-sm mb-10">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-gradient-to-r from-gold to-transparent" />
              <span className="text-[11px] font-bold tracking-[0.35em] uppercase text-gold">Instant Quote</span>
              <div className="h-px w-10 bg-gradient-to-l from-gold to-transparent" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95]">
              GET YOUR
              <br />
              <span className="gradient-text-gold">INSTANT QUOTE</span>
            </h1>
            <p className="mt-6 text-cream/40 max-w-xl">
              Tell us about your event. Our AI concierge will generate a tailored quote in seconds.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="gold-divider w-full" />

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {!quote ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto border border-gold/10 p-8 sm:p-10 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.25em] uppercase text-cream/30 mb-2">Event Type *</label>
                    <select
                      required
                      value={form.event_type}
                      onChange={(e) => updateField("event_type", e.target.value)}
                      className="w-full px-5 py-3.5 bg-gold/[0.03] border border-gold/10 text-cream focus:outline-none focus:border-gold/30 appearance-none"
                    >
                      <option value="" className="bg-charcoal">Select type</option>
                      {EVENT_TYPES.map((t) => (
                        <option key={t} value={t} className="bg-charcoal">{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.25em] uppercase text-cream/30 mb-2">Event Date *</label>
                    <input
                      required
                      type="date"
                      value={form.event_date}
                      onChange={(e) => updateField("event_date", e.target.value)}
                      className="w-full px-5 py-3.5 bg-gold/[0.03] border border-gold/10 text-cream focus:outline-none focus:border-gold/30"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-[0.25em] uppercase text-cream/30 mb-2">Location *</label>
                  <input
                    required
                    type="text"
                    placeholder="City, State or Country"
                    value={form.location}
                    onChange={(e) => updateField("location", e.target.value)}
                    className="w-full px-5 py-3.5 bg-gold/[0.03] border border-gold/10 text-cream placeholder-cream/20 focus:outline-none focus:border-gold/30"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.25em] uppercase text-cream/30 mb-2">Estimated Guests</label>
                    <input
                      type="text"
                      placeholder="e.g. 150"
                      value={form.guests}
                      onChange={(e) => updateField("guests", e.target.value)}
                      className="w-full px-5 py-3.5 bg-gold/[0.03] border border-gold/10 text-cream placeholder-cream/20 focus:outline-none focus:border-gold/30"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.25em] uppercase text-cream/30 mb-2">Preferred Duration</label>
                    <select
                      value={form.duration}
                      onChange={(e) => updateField("duration", e.target.value)}
                      className="w-full px-5 py-3.5 bg-gold/[0.03] border border-gold/10 text-cream focus:outline-none focus:border-gold/30 appearance-none"
                    >
                      <option value="" className="bg-charcoal">Select duration</option>
                      {DURATIONS.map((d) => (
                        <option key={d} value={d} className="bg-charcoal">{d}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-[0.25em] uppercase text-cream/30 mb-2">Additional Details</label>
                  <textarea
                    rows={4}
                    placeholder="Vibe, special requests, song preferences, band setup, travel considerations..."
                    value={form.details}
                    onChange={(e) => updateField("details", e.target.value)}
                    className="w-full px-5 py-3.5 bg-gold/[0.03] border border-gold/10 text-cream placeholder-cream/20 focus:outline-none focus:border-gold/30 resize-none"
                  />
                </div>

                {error && (
                  <div className="px-4 py-3 border border-red-500/20 bg-red-500/5 text-red-300 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!canSubmit || loading}
                  className={cn(
                    "w-full py-4 text-[12px] tracking-wider uppercase font-bold transition-all flex items-center justify-center gap-2",
                    canSubmit && !loading
                      ? "bg-gradient-to-r from-gold-light via-gold to-gold-dark text-charcoal hover:shadow-lg hover:shadow-gold/15 cursor-pointer"
                      : "bg-gold/10 text-cream/20 cursor-not-allowed"
                  )}
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-4 w-4 border-2 border-charcoal/30 border-t-charcoal rounded-full"
                      />
                      Generating Your Quote...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate My Quote
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
                <p className="text-[10px] text-cream/15 text-center tracking-wider">
                  Powered by AI &bull; Delivered in seconds &bull; Not a final invoice
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="quote"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto"
              >
                <div className="border border-gold/15 p-8 sm:p-10">
                  <div className="h-1 w-full bg-gradient-to-r from-gold-dark via-gold to-gold-light mb-8 -mt-10 -mx-10" />

                  <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-gold font-bold mb-4">
                    <Sparkles className="h-3 w-3" /> Your Personalized Quote
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-8">{quote.headline}</h2>

                  {/* Event summary */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                    {[
                      { icon: <Calendar className="h-4 w-4" />, label: "Date", value: form.event_date },
                      { icon: <MapPin className="h-4 w-4" />, label: "Location", value: form.location },
                      { icon: <Users className="h-4 w-4" />, label: "Guests", value: form.guests || "TBD" },
                      { icon: <Clock className="h-4 w-4" />, label: "Duration", value: form.duration || "TBD" },
                    ].map((item) => (
                      <div key={item.label} className="p-3 border border-gold/5">
                        <div className="text-gold/40 mb-1">{item.icon}</div>
                        <p className="text-[9px] tracking-wider uppercase text-cream/25">{item.label}</p>
                        <p className="text-sm font-medium truncate">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Recommended package */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-cream/25">Recommended Package</span>
                    </div>
                    <div className="flex items-center justify-between p-5 border border-gold/15 bg-gold/[0.03]">
                      <div>
                        <p className="text-xl font-black gradient-text-gold">{quote.recommended_package}</p>
                        <p className="text-xs text-cream/40 mt-1 max-w-md">{quote.package_reason}</p>
                      </div>
                      <p className="text-xl font-black">{formatUSD(quote.base_price)}</p>
                    </div>
                  </div>

                  {/* Line items */}
                  {quote.line_items.length > 0 && (
                    <div className="mb-8">
                      <p className="text-[10px] tracking-[0.3em] uppercase text-cream/25 mb-3">Add-ons & Adjustments</p>
                      <div className="space-y-2">
                        {quote.line_items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between py-3 border-b border-gold/5 last:border-0">
                            <span className="text-sm text-cream/60">{item.label}</span>
                            <span className="text-sm font-bold text-gold">{formatUSD(item.price)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Totals */}
                  <div className="border-t-2 border-gold/20 pt-5 mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-cream/40">Subtotal</span>
                      <span className="text-lg font-bold">{formatUSD(quote.subtotal)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm tracking-wider uppercase text-cream/60 font-bold">Estimated Range</span>
                      <span className="text-2xl font-black gradient-text-gold">
                        {formatUSD(quote.estimated_range.low)} – {formatUSD(quote.estimated_range.high)}
                      </span>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="mb-8">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-cream/25 mb-3">Recommendations & Notes</p>
                    <ul className="space-y-2">
                      {quote.notes.map((note, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-cream/60">{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Closing */}
                  <p className="text-cream/50 italic mb-8 leading-relaxed">&ldquo;{quote.closing}&rdquo;</p>

                  {/* CTAs */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Link href="/book">
                      <button className="w-full py-4 text-[12px] tracking-wider uppercase font-bold bg-gradient-to-r from-gold-light via-gold to-gold-dark text-charcoal hover:shadow-lg hover:shadow-gold/15 transition-all cursor-pointer flex items-center justify-center gap-2">
                        Book This Date <ArrowRight className="h-4 w-4" />
                      </button>
                    </Link>
                    <Link href="/chat">
                      <button className="w-full py-4 text-[12px] tracking-wider uppercase font-bold border border-gold/30 text-gold hover:bg-gold/5 transition-all cursor-pointer flex items-center justify-center gap-2">
                        <MessageCircle className="h-4 w-4" /> Discuss With Us
                      </button>
                    </Link>
                  </div>

                  <p className="text-[10px] text-cream/15 text-center mt-6 tracking-wider">
                    This is an AI-generated estimate. Final pricing confirmed by Bayo&apos;s team.
                  </p>

                  <button
                    onClick={() => {
                      setQuote(null);
                      setForm({ event_type: "", event_date: "", location: "", guests: "", duration: "", details: "" });
                    }}
                    className="w-full mt-4 text-xs text-cream/30 hover:text-gold transition-colors cursor-pointer"
                  >
                    Generate another quote
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <footer className="border-t border-gold/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-cream/15 tracking-wider">
          <p>&copy; 2026 Bayo Entertainment. All rights reserved.</p>
          <Link href="/" className="text-cream/30 hover:text-gold transition-colors flex items-center gap-2">
            <Music className="h-3.5 w-3.5" /> BAYO.
          </Link>
        </div>
      </footer>
    </div>
  );
}
