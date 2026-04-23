"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ChatFab() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissedTooltip, setDismissedTooltip] = useState(false);

  useEffect(() => {
    // Show FAB after 3 seconds
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Show tooltip after FAB appears, but only once per session
    if (isVisible && !dismissedTooltip) {
      const tooltipTimer = setTimeout(() => {
        const alreadyDismissed = sessionStorage.getItem("bayo-chat-tooltip");
        if (!alreadyDismissed) setShowTooltip(true);
      }, 1500);
      return () => clearTimeout(tooltipTimer);
    }
  }, [isVisible, dismissedTooltip]);

  const dismissTooltip = () => {
    setShowTooltip(false);
    setDismissedTooltip(true);
    sessionStorage.setItem("bayo-chat-tooltip", "true");
  };

  // Don't show FAB on the chat page itself
  if (pathname === "/chat") return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3">
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="hidden sm:block bg-[#12100c] border border-gold/20 p-4 max-w-[260px] mb-2 relative"
              >
                <button
                  onClick={dismissTooltip}
                  className="absolute top-2 right-2 h-5 w-5 flex items-center justify-center text-cream/30 hover:text-cream transition-colors cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-[9px] text-emerald-400 tracking-wider uppercase font-bold">Online Now</span>
                </div>
                <p className="text-sm text-cream/70 font-medium mb-1">
                  Chat with Bayo&apos;s team <span className="text-gold">live</span>
                </p>
                <p className="text-[11px] text-cream/30">
                  Book faster, get answers instantly.
                </p>
                {/* Arrow pointing to FAB */}
                <div className="absolute -right-[6px] bottom-6 w-3 h-3 rotate-45 bg-[#12100c] border-r border-b border-gold/20" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* FAB button */}
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Pulsing ring */}
            <span className="absolute inset-0 rounded-full animate-ping bg-gold/30" />
            <span className="absolute inset-0 rounded-full animate-pulse bg-gold/20" />

            <Link
              href="/chat"
              onClick={dismissTooltip}
              className="relative h-14 w-14 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark text-charcoal flex items-center justify-center shadow-2xl shadow-gold/30 hover:scale-110 transition-transform duration-300 group"
              aria-label="Open chat"
            >
              <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
              {/* Online indicator */}
              <span className="absolute top-1 right-1 h-3 w-3 bg-emerald-500 border-2 border-[#0d0b08] rounded-full" />
            </Link>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
