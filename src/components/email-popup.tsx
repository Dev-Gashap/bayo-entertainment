"use client";

import { useState, useEffect } from "react";
import { X, Music, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";

export function EmailPopup() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed or submitted
    const dismissed = localStorage.getItem("bayo-popup-dismissed");
    if (dismissed) return;

    // Show after 8 seconds
    const timer = setTimeout(() => setIsOpen(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("bayo-popup-dismissed", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // TODO: Connect to email service (Mailchimp, ConvertKit, etc.)
    console.log("Email submitted:", email);
    setSubmitted(true);
    localStorage.setItem("bayo-popup-dismissed", "true");

    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-md bg-[#12100c] border border-gold/15 overflow-hidden">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 h-8 w-8 flex items-center justify-center text-cream/30 hover:text-cream transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Top accent */}
              <div className="h-1 w-full bg-gradient-to-r from-gold-dark via-gold to-gold-light" />

              <div className="p-8 sm:p-10">
                {!submitted ? (
                  <>
                    {/* Icon */}
                    <div className="h-14 w-14 border border-gold/20 flex items-center justify-center text-gold mx-auto mb-6">
                      <Music className="h-7 w-7" />
                    </div>

                    <h3 className="text-2xl font-black text-center tracking-tight mb-2">
                      {t.popup.title1} <span className="gradient-text-gold">{t.popup.title2}</span>
                    </h3>
                    <p className="text-sm text-cream/40 text-center mb-8 max-w-xs mx-auto">
                      {t.popup.subtitle}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.popup.placeholder}
                        required
                        className="w-full px-5 py-3.5 bg-gold/[0.03] border border-gold/10 text-cream placeholder-cream/20 focus:outline-none focus:border-gold/30 transition-colors text-sm"
                      />
                      <button
                        type="submit"
                        className="w-full py-3.5 bg-gradient-to-r from-gold-light via-gold to-gold-dark text-charcoal font-bold text-[12px] tracking-wider uppercase hover:shadow-lg hover:shadow-gold/15 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {t.popup.cta}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </form>

                    <p className="text-[10px] text-cream/15 text-center mt-5 tracking-wider">
                      {t.popup.noSpam}
                    </p>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <div className="h-14 w-14 border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                      <svg className="h-7 w-7 text-emerald-400" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-black tracking-tight mb-2">
                      {t.popup.success}
                    </h3>
                    <p className="text-sm text-cream/40">
                      {t.popup.successMsg}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
