"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Music,
  Calendar,
  MapPin,
  Clock,
  Users,
  Mail,
  Phone,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { cn } from "@/lib/utils";

/* ─── Booked / unavailable dates (sample) ─── */
const bookedDates = new Set([
  "2026-04-18", "2026-04-26", "2026-05-03", "2026-05-10",
  "2026-05-24", "2026-05-31", "2026-06-07", "2026-06-14",
  "2026-06-21", "2026-07-04",
]);

const eventTypes = [
  "Wedding", "Corporate Event", "Private Party", "Concert / Festival",
  "Birthday Celebration", "Anniversary", "Religious Event", "Other",
];

const timeSlots = [
  "Morning (9AM - 12PM)", "Afternoon (12PM - 4PM)",
  "Evening (4PM - 8PM)", "Night (8PM - 12AM)",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
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

/* ─── Calendar Component ─── */
function BookingCalendar({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (date: string) => void;
}) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  const cells = useMemo(() => {
    const arr: (number | null)[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(d);
    return arr;
  }, [firstDayOfWeek, daysInMonth]);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const formatDate = (day: number) =>
    `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  };

  return (
    <div className="border border-gold/10 p-6 sm:p-8">
      {/* Month header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={prevMonth} className="h-9 w-9 border border-gold/10 flex items-center justify-center text-cream/40 hover:text-gold hover:border-gold/30 transition-all cursor-pointer">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h3 className="text-lg font-bold tracking-wide">
          {MONTHS[viewMonth]} <span className="text-gold">{viewYear}</span>
        </h3>
        <button onClick={nextMonth} className="h-9 w-9 border border-gold/10 flex items-center justify-center text-cream/40 hover:text-gold hover:border-gold/30 transition-all cursor-pointer">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[10px] tracking-widest uppercase text-cream/20 py-2">
            {d}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />;

          const dateStr = formatDate(day);
          const isBooked = bookedDates.has(dateStr);
          const past = isPast(day);
          const isSelected = selected === dateStr;
          const isToday =
            day === today.getDate() &&
            viewMonth === today.getMonth() &&
            viewYear === today.getFullYear();

          return (
            <button
              key={dateStr}
              disabled={isBooked || past}
              onClick={() => onSelect(dateStr)}
              className={cn(
                "relative h-10 sm:h-12 flex items-center justify-center text-sm transition-all duration-200 cursor-pointer",
                past && "text-cream/10 cursor-not-allowed",
                isBooked && !past && "text-red-400/60 cursor-not-allowed line-through",
                !isBooked && !past && "text-cream/60 hover:text-gold hover:bg-gold/5",
                isSelected && "bg-gold text-charcoal font-bold hover:bg-gold hover:text-charcoal",
                isToday && !isSelected && "border border-gold/30",
              )}
            >
              {day}
              {isBooked && !past && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-red-400/60" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gold/5">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-gold" />
          <span className="text-[10px] text-cream/30 tracking-wider uppercase">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 border border-gold/30" />
          <span className="text-[10px] text-cream/30 tracking-wider uppercase">Today</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-red-400/30" />
          <span className="text-[10px] text-cream/30 tracking-wider uppercase">Booked</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ─── */
export default function BookPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", eventType: "", timeSlot: "",
    location: "", guests: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send to backend / email service
    console.log("Booking request:", { date: selectedDate, ...formData });
    setSubmitted(true);
  };

  const canProceed =
    step === 1 ? !!selectedDate :
    step === 2 ? !!(formData.name && formData.email && formData.eventType && formData.timeSlot) :
    true;

  return (
    <div className="min-h-screen bg-[#0d0b08] text-cream">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-10 relative">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gold/[0.02] rounded-full blur-[150px]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Link href="/" className="inline-flex items-center gap-2 text-cream/30 hover:text-gold transition-colors text-sm mb-10">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-gradient-to-r from-gold to-transparent" />
              <span className="text-[11px] font-bold tracking-[0.35em] uppercase text-gold">Book</span>
              <div className="h-px w-10 bg-gradient-to-l from-gold to-transparent" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95]">
              BOOK YOUR
              <br />
              <span className="gradient-text-gold">EXPERIENCE</span>
            </h1>
            <p className="mt-6 text-cream/40 max-w-lg">
              Select a date, tell us about your event, and we&apos;ll craft the perfect performance.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="gold-divider w-full" />

      {/* Progress steps */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2">
            {["Select Date", "Event Details", "Confirm"].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className={cn(
                  "h-8 w-8 flex items-center justify-center text-xs font-bold transition-all",
                  step > i + 1 ? "bg-gold text-charcoal" :
                  step === i + 1 ? "border-2 border-gold text-gold" :
                  "border border-gold/10 text-cream/20"
                )}>
                  {step > i + 1 ? <CheckCircle className="h-4 w-4" /> : i + 1}
                </div>
                <span className={cn(
                  "text-[10px] tracking-wider uppercase hidden sm:block",
                  step === i + 1 ? "text-gold" : "text-cream/20"
                )}>
                  {label}
                </span>
                {i < 2 && <div className="w-8 sm:w-16 h-px bg-gold/10 mx-1" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="h-20 w-20 border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="h-10 w-10 text-emerald-400" />
                </div>
                <h2 className="text-3xl font-black mb-3">Booking Request Sent!</h2>
                <p className="text-cream/40 max-w-md mx-auto mb-4">
                  We&apos;ve received your request for <span className="text-gold font-medium">{selectedDate}</span>.
                  Bayo&apos;s team will reach out within 24 hours to confirm details and availability.
                </p>
                <p className="text-cream/25 text-sm">Check your email for a confirmation receipt.</p>
                <Link href="/" className="inline-flex items-center gap-2 mt-10 text-gold hover:text-gold-light transition-colors text-sm">
                  <ArrowLeft className="h-4 w-4" /> Back to Home
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step 1: Calendar */}
                {step === 1 && (
                  <div className="grid lg:grid-cols-[1fr_340px] gap-10">
                    <BookingCalendar selected={selectedDate} onSelect={setSelectedDate} />
                    <div className="border border-gold/10 p-6 h-fit">
                      <h3 className="text-sm font-bold tracking-wider uppercase text-cream/60 mb-4">Selected Date</h3>
                      {selectedDate ? (
                        <div>
                          <p className="text-2xl font-black gradient-text-gold mb-1">
                            {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                          </p>
                          <p className="text-xs text-emerald-400 flex items-center gap-1.5 mt-3">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" /> Available
                          </p>
                        </div>
                      ) : (
                        <p className="text-cream/20 text-sm">Pick a date from the calendar</p>
                      )}

                      <div className="mt-8 pt-6 border-t border-gold/5 space-y-3">
                        <div className="flex items-center gap-3 text-cream/30 text-xs">
                          <Calendar className="h-4 w-4 text-gold/40" />
                          <span>Response within 24 hours</span>
                        </div>
                        <div className="flex items-center gap-3 text-cream/30 text-xs">
                          <MapPin className="h-4 w-4 text-gold/40" />
                          <span>Worldwide availability</span>
                        </div>
                        <div className="flex items-center gap-3 text-cream/30 text-xs">
                          <Sparkles className="h-4 w-4 text-gold/40" />
                          <span>Custom packages available</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Details form */}
                {step === 2 && (
                  <form className="max-w-2xl mx-auto border border-gold/10 p-8 sm:p-10 space-y-6">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] font-bold tracking-[0.25em] uppercase text-cream/30 mb-2">Full Name *</label>
                        <input type="text" required value={formData.name} onChange={(e) => updateField("name", e.target.value)}
                          placeholder="Your name" className="w-full px-5 py-3.5 bg-gold/[0.03] border border-gold/10 text-cream placeholder-cream/20 focus:outline-none focus:border-gold/30 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold tracking-[0.25em] uppercase text-cream/30 mb-2">Email *</label>
                        <input type="email" required value={formData.email} onChange={(e) => updateField("email", e.target.value)}
                          placeholder="you@email.com" className="w-full px-5 py-3.5 bg-gold/[0.03] border border-gold/10 text-cream placeholder-cream/20 focus:outline-none focus:border-gold/30 transition-colors" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] font-bold tracking-[0.25em] uppercase text-cream/30 mb-2">Phone</label>
                        <input type="tel" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)}
                          placeholder="+1 (555) 000-0000" className="w-full px-5 py-3.5 bg-gold/[0.03] border border-gold/10 text-cream placeholder-cream/20 focus:outline-none focus:border-gold/30 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold tracking-[0.25em] uppercase text-cream/30 mb-2">Event Type *</label>
                        <select required value={formData.eventType} onChange={(e) => updateField("eventType", e.target.value)}
                          className="w-full px-5 py-3.5 bg-gold/[0.03] border border-gold/10 text-cream focus:outline-none focus:border-gold/30 transition-colors appearance-none">
                          <option value="" className="bg-charcoal">Select type</option>
                          {eventTypes.map((t) => <option key={t} value={t} className="bg-charcoal">{t}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] font-bold tracking-[0.25em] uppercase text-cream/30 mb-2">Preferred Time *</label>
                        <select required value={formData.timeSlot} onChange={(e) => updateField("timeSlot", e.target.value)}
                          className="w-full px-5 py-3.5 bg-gold/[0.03] border border-gold/10 text-cream focus:outline-none focus:border-gold/30 transition-colors appearance-none">
                          <option value="" className="bg-charcoal">Select time</option>
                          {timeSlots.map((t) => <option key={t} value={t} className="bg-charcoal">{t}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold tracking-[0.25em] uppercase text-cream/30 mb-2">Est. Guests</label>
                        <input type="text" value={formData.guests} onChange={(e) => updateField("guests", e.target.value)}
                          placeholder="e.g. 150" className="w-full px-5 py-3.5 bg-gold/[0.03] border border-gold/10 text-cream placeholder-cream/20 focus:outline-none focus:border-gold/30 transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-[0.25em] uppercase text-cream/30 mb-2">Event Location</label>
                      <input type="text" value={formData.location} onChange={(e) => updateField("location", e.target.value)}
                        placeholder="City, State or Country" className="w-full px-5 py-3.5 bg-gold/[0.03] border border-gold/10 text-cream placeholder-cream/20 focus:outline-none focus:border-gold/30 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-[0.25em] uppercase text-cream/30 mb-2">Additional Details</label>
                      <textarea rows={4} value={formData.message} onChange={(e) => updateField("message", e.target.value)}
                        placeholder="Tell us about your vision for the event..." className="w-full px-5 py-3.5 bg-gold/[0.03] border border-gold/10 text-cream placeholder-cream/20 focus:outline-none focus:border-gold/30 transition-colors resize-none" />
                    </div>
                  </form>
                )}

                {/* Step 3: Confirm */}
                {step === 3 && (
                  <div className="max-w-2xl mx-auto border border-gold/10 p-8 sm:p-10">
                    <h3 className="text-xl font-black mb-6">Review Your Booking</h3>
                    <div className="space-y-4">
                      {[
                        { icon: <Calendar className="h-4 w-4" />, label: "Date", value: selectedDate ? new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) : "" },
                        { icon: <Clock className="h-4 w-4" />, label: "Time", value: formData.timeSlot },
                        { icon: <Sparkles className="h-4 w-4" />, label: "Event", value: formData.eventType },
                        { icon: <MapPin className="h-4 w-4" />, label: "Location", value: formData.location || "TBD" },
                        { icon: <Users className="h-4 w-4" />, label: "Guests", value: formData.guests || "TBD" },
                        { icon: <Mail className="h-4 w-4" />, label: "Email", value: formData.email },
                        { icon: <Phone className="h-4 w-4" />, label: "Phone", value: formData.phone || "Not provided" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-4 py-3 border-b border-gold/5 last:border-0">
                          <div className="text-gold/40">{item.icon}</div>
                          <span className="text-[10px] tracking-wider uppercase text-cream/25 w-20">{item.label}</span>
                          <span className="text-cream/70 font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>
                    {formData.message && (
                      <div className="mt-6 pt-4 border-t border-gold/5">
                        <p className="text-[10px] tracking-wider uppercase text-cream/25 mb-2">Notes</p>
                        <p className="text-cream/50 text-sm">{formData.message}</p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          {!submitted && (
            <div className="max-w-2xl mx-auto flex items-center justify-between mt-10">
              {step > 1 ? (
                <button onClick={() => setStep(step - 1)}
                  className="px-8 py-3 text-[12px] tracking-wider uppercase font-medium text-gold border border-gold/20 hover:bg-gold/5 transition-all cursor-pointer flex items-center gap-2">
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>
              ) : <div />}

              {step < 3 ? (
                <button onClick={() => canProceed && setStep(step + 1)} disabled={!canProceed}
                  className={cn(
                    "px-8 py-3 text-[12px] tracking-wider uppercase font-bold flex items-center gap-2 transition-all cursor-pointer",
                    canProceed
                      ? "bg-gradient-to-r from-gold-light via-gold to-gold-dark text-charcoal hover:shadow-lg hover:shadow-gold/15"
                      : "bg-gold/10 text-cream/20 cursor-not-allowed"
                  )}>
                  Continue <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button onClick={handleSubmit}
                  className="px-10 py-3 text-[12px] tracking-wider uppercase font-bold bg-gradient-to-r from-gold-light via-gold to-gold-dark text-charcoal hover:shadow-lg hover:shadow-gold/15 transition-all cursor-pointer flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> Confirm Booking
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer mini */}
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
