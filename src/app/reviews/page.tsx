"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Star,
  Quote,
  Music,
  MapPin,
  Camera,
  Send,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { cn } from "@/lib/utils";

/* ─── Reviews data ─── */
const reviews = [
  {
    name: "Jessica & David Thompson",
    location: "The Woodlands, TX",
    event: "Wedding Reception",
    date: "March 2026",
    rating: 5,
    text: "Bayo played our wedding ceremony, cocktail hour, AND reception. Our guests could not stop talking about the saxophone. It was the highlight of the entire night. From the first note during the processional to the last dance — pure magic. We've watched our wedding video 20 times and cry happy tears every time his saxophone comes on.",
    image: "/images/hero-formal.jpeg",
    featured: true,
  },
  {
    name: "Marcus Williams",
    location: "New York, NY",
    event: "Corporate Gala",
    date: "February 2026",
    rating: 5,
    text: "We've booked Bayo for three consecutive corporate galas. The sophistication, energy, and pure talent are unmatched. He reads the room perfectly every single time. Our executives and clients always ask 'who is that saxophone player?' Absolute professional.",
    image: null,
    featured: false,
  },
  {
    name: "Amara Okafor",
    location: "Atlanta, GA",
    event: "Birthday Celebration",
    date: "January 2026",
    rating: 5,
    text: "Booked Bayo for my husband's surprise 40th birthday. The moment he walked in playing the saxophone, my husband broke down in tears. Best surprise ever. The energy he brought was insane — had everyone on their feet dancing. Worth every single penny.",
    image: null,
    featured: false,
  },
  {
    name: "Pastor & Mrs. Okonkwo",
    location: "Houston, TX",
    event: "Church Anniversary",
    date: "December 2025",
    rating: 5,
    text: "Bayo blessed our church's 25th anniversary celebration with such anointed music. His gospel saxophone renditions brought the entire congregation to worship. Several people told us it was the most powerful musical moment they'd ever experienced in service.",
    image: null,
    featured: false,
  },
  {
    name: "Sarah Chen",
    location: "Los Angeles, CA",
    event: "New Year's Eve Gala",
    date: "December 2025",
    rating: 5,
    text: "Flew Bayo out to LA for our NYE gala and it was the best decision we made. He performed with such grace and energy — the perfect blend of smooth jazz for dinner and uptempo hits for the dance floor. Already booked him for next year!",
    image: "/images/hero-stage.jpeg",
    featured: false,
  },
  {
    name: "Tunde & Kemi Adewale",
    location: "London, UK",
    event: "Traditional Wedding",
    date: "November 2025",
    rating: 5,
    text: "Bayo flew all the way to London for our traditional wedding ceremony. He played a mix of highlife, juju, and contemporary afrobeats on the saxophone that had our Nigerian and British guests all dancing together. A true cultural bridge through music.",
    image: null,
    featured: false,
  },
];

/* ─── Animation ─── */
function FadeIn({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Page ─── */
export default function ReviewsPage() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", event: "", location: "", date: "", rating: 5, text: "",
  });

  const updateField = (field: string, value: string | number) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Review submitted:", form);
    setSubmitted(true);
    setTimeout(() => { setShowForm(false); setSubmitted(false); }, 3000);
  };

  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="min-h-screen bg-[#0d0b08] text-cream">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Link href="/" className="inline-flex items-center gap-2 text-cream/30 hover:text-gold transition-colors text-sm mb-10">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-gradient-to-r from-gold to-transparent" />
              <span className="text-[11px] font-bold tracking-[0.35em] uppercase text-gold">Reviews</span>
              <div className="h-px w-10 bg-gradient-to-l from-gold to-transparent" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95]">
              CLIENT
              <br />
              <span className="gradient-text-gold">REVIEWS</span>
            </h1>
          </FadeIn>

          {/* Stats bar */}
          <FadeIn delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-8 sm:gap-12">
              <div>
                <p className="text-4xl font-black gradient-text-gold">{avgRating}</p>
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-[10px] text-cream/20 tracking-wider uppercase mt-1">Average Rating</p>
              </div>
              <div className="h-12 w-px bg-gold/10" />
              <div>
                <p className="text-4xl font-black gradient-text-gold">{reviews.length}+</p>
                <p className="text-[10px] text-cream/20 tracking-wider uppercase mt-1">Client Reviews</p>
              </div>
              <div className="h-12 w-px bg-gold/10" />
              <div>
                <p className="text-4xl font-black gradient-text-gold">100%</p>
                <p className="text-[10px] text-cream/20 tracking-wider uppercase mt-1">Would Recommend</p>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => setShowForm(true)}
                  className="px-8 py-3 text-[12px] tracking-wider uppercase font-bold bg-gradient-to-r from-gold-light via-gold to-gold-dark text-charcoal hover:shadow-lg hover:shadow-gold/15 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Send className="h-4 w-4" /> Write a Review
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="gold-divider w-full" />

      {/* Featured review */}
      {reviews.filter((r) => r.featured).map((r) => (
        <section key={r.name} className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-center">
                <div>
                  <Quote className="h-10 w-10 text-gold/15 mb-6" />
                  <p className="text-xl sm:text-2xl text-cream/70 leading-relaxed font-light italic">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                      ))}
                    </div>
                    <div className="h-4 w-px bg-gold/10" />
                    <div>
                      <p className="font-bold text-sm">{r.name}</p>
                      <p className="text-[10px] text-cream/30 tracking-wider uppercase">{r.event} &bull; {r.location}</p>
                    </div>
                  </div>
                </div>
                {r.image && (
                  <div className="relative aspect-[4/3] overflow-hidden hidden lg:block">
                    <Image src={r.image} alt={r.event} fill className="object-cover" style={{ objectPosition: "center 20%" }} quality={80} />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0d0b08]/30" />
                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-[10px] tracking-widest uppercase text-gold font-bold">
                      <Camera className="h-3 w-3 inline mr-1" /> From the event
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </section>
      ))}

      <div className="gold-divider w-full" />

      {/* All reviews */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {reviews.filter((r) => !r.featured).map((r, i) => (
              <FadeIn key={r.name} delay={i * 0.08}>
                <div className="p-8 border border-gold/5 hover:border-gold/15 transition-all duration-500 h-full flex flex-col relative group">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/15 group-hover:border-gold/30 transition-colors" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/15 group-hover:border-gold/30 transition-colors" />

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <Star key={j} className="h-3 w-3 fill-gold text-gold" />
                      ))}
                    </div>
                    <span className="text-[10px] text-cream/15 tracking-wider uppercase">{r.date}</span>
                  </div>

                  <Quote className="h-6 w-6 text-gold/10 mb-4" />
                  <p className="text-cream/50 leading-relaxed mb-6 flex-1 text-[15px]">
                    {r.text}
                  </p>

                  <div className="pt-4 border-t border-gold/5">
                    <p className="font-bold text-sm">{r.name}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-[10px] text-cream/25 tracking-wider uppercase">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {r.location}</span>
                      <span>&bull;</span>
                      <span>{r.event}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Write a review modal */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => !submitted && setShowForm(false)}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4 overflow-y-auto"
            >
              <div className="relative w-full max-w-lg bg-[#12100c] border border-gold/15">
                <div className="h-1 w-full bg-gradient-to-r from-gold-dark via-gold to-gold-light" />
                <div className="p-8">
                  {!submitted ? (
                    <>
                      <h3 className="text-xl font-black mb-1">Share Your Experience</h3>
                      <p className="text-sm text-cream/30 mb-6">Your review helps others discover excellence.</p>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <input type="text" required placeholder="Your name" value={form.name} onChange={(e) => updateField("name", e.target.value)}
                            className="px-4 py-3 bg-gold/[0.03] border border-gold/10 text-cream placeholder-cream/20 focus:outline-none focus:border-gold/30 text-sm" />
                          <input type="email" required placeholder="Email" value={form.email} onChange={(e) => updateField("email", e.target.value)}
                            className="px-4 py-3 bg-gold/[0.03] border border-gold/10 text-cream placeholder-cream/20 focus:outline-none focus:border-gold/30 text-sm" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <input type="text" placeholder="Event type" value={form.event} onChange={(e) => updateField("event", e.target.value)}
                            className="px-4 py-3 bg-gold/[0.03] border border-gold/10 text-cream placeholder-cream/20 focus:outline-none focus:border-gold/30 text-sm" />
                          <input type="text" placeholder="City, State" value={form.location} onChange={(e) => updateField("location", e.target.value)}
                            className="px-4 py-3 bg-gold/[0.03] border border-gold/10 text-cream placeholder-cream/20 focus:outline-none focus:border-gold/30 text-sm" />
                        </div>

                        {/* Star rating */}
                        <div>
                          <label className="block text-[10px] font-bold tracking-[0.25em] uppercase text-cream/30 mb-2">Rating</label>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <button key={s} type="button" onClick={() => updateField("rating", s)}
                                className="cursor-pointer p-1">
                                <Star className={cn("h-6 w-6 transition-colors", s <= form.rating ? "fill-gold text-gold" : "text-cream/10")} />
                              </button>
                            ))}
                          </div>
                        </div>

                        <textarea rows={4} required placeholder="Tell us about your experience with Bayo..." value={form.text} onChange={(e) => updateField("text", e.target.value)}
                          className="w-full px-4 py-3 bg-gold/[0.03] border border-gold/10 text-cream placeholder-cream/20 focus:outline-none focus:border-gold/30 text-sm resize-none" />

                        <div className="flex gap-3">
                          <button type="button" onClick={() => setShowForm(false)}
                            className="flex-1 py-3 text-[12px] tracking-wider uppercase font-medium text-gold border border-gold/20 hover:bg-gold/5 transition-all cursor-pointer">
                            Cancel
                          </button>
                          <button type="submit"
                            className="flex-1 py-3 text-[12px] tracking-wider uppercase font-bold bg-gradient-to-r from-gold-light via-gold to-gold-dark text-charcoal hover:shadow-lg hover:shadow-gold/15 transition-all cursor-pointer flex items-center justify-center gap-2">
                            <Send className="h-3.5 w-3.5" /> Submit
                          </button>
                        </div>
                      </form>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="h-14 w-14 border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-7 w-7 text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-black mb-2">Thank You!</h3>
                      <p className="text-sm text-cream/40">Your review has been submitted for approval.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CTA */}
      <div className="gold-divider w-full" />
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to Create Your Own{" "}
              <span className="gradient-text-gold">Story?</span>
            </h2>
            <p className="mt-4 text-cream/40 max-w-md mx-auto">
              Join hundreds of happy clients who trusted Bayo to make their event unforgettable.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/book">
                <button className="group px-10 py-4 text-[13px] tracking-wider uppercase font-bold text-charcoal bg-gradient-to-r from-gold-light via-gold to-gold-dark hover:shadow-2xl hover:shadow-gold/20 transition-all cursor-pointer flex items-center gap-3">
                  Book Now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </FadeIn>
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
