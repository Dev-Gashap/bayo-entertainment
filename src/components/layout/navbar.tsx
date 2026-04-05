"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "/spotlight", label: "Spotlight" },
  { href: "#music", label: "Music" },
  { href: "#events", label: "Events" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
        scrolled
          ? "bg-[#0d0b08]/90 backdrop-blur-2xl border-b border-gold/10 py-3"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-2xl font-black tracking-tight text-cream">
              BAYO<span className="text-gold">.</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="underline-grow px-4 py-2 text-[13px] tracking-wider uppercase text-cream/60 hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="underline-grow px-4 py-2 text-[13px] tracking-wider uppercase text-cream/60 hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          <a href="#booking" className="hidden md:block">
            <button className="px-7 py-2.5 text-[13px] tracking-wider uppercase font-semibold text-charcoal bg-gradient-to-r from-gold-light via-gold to-gold-dark rounded-none hover:shadow-lg hover:shadow-gold/20 transition-all duration-300 cursor-pointer">
              Book Now
            </button>
          </a>

          <button
            className="md:hidden text-cream p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-500 ease-in-out",
          mobileOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 py-6 space-y-1 bg-[#0d0b08]/95 backdrop-blur-2xl border-t border-gold/10">
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-[13px] tracking-wider uppercase text-cream/60 hover:text-gold hover:bg-gold/5 transition-all"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-[13px] tracking-wider uppercase text-cream/60 hover:text-gold hover:bg-gold/5 transition-all"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            )
          )}
          <div className="pt-3">
            <a href="#booking" onClick={() => setMobileOpen(false)}>
              <button className="w-full py-3 text-[13px] tracking-wider uppercase font-semibold text-charcoal bg-gradient-to-r from-gold-light via-gold to-gold-dark cursor-pointer">
                Book Now
              </button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
