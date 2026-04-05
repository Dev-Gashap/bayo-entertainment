"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/context";
import { localeNames, type Locale } from "@/lib/i18n";

const navLinks = [
  { href: "#about", key: "about" as const },
  { href: "/spotlight", key: "spotlight" as const },
  { href: "#music", key: "music" as const },
  { href: "/blog", key: "blog" as const },
  { href: "/shop", key: "shop" as const },
  { href: "/reviews", key: "reviews" as const },
  { href: "#contact", key: "contact" as const },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { locale, setLocale, t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLabels = t.nav;

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
            {navLinks.map((link) => {
              const label = navLabels[link.key];
              return link.href.startsWith("/") ? (
                <Link key={link.href} href={link.href}
                  className="underline-grow px-4 py-2 text-[13px] tracking-wider uppercase text-cream/60 hover:text-gold transition-colors duration-300">
                  {label}
                </Link>
              ) : (
                <a key={link.href} href={link.href}
                  className="underline-grow px-4 py-2 text-[13px] tracking-wider uppercase text-cream/60 hover:text-gold transition-colors duration-300">
                  {label}
                </a>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-[11px] tracking-wider uppercase text-cream/40 hover:text-gold border border-gold/10 hover:border-gold/30 transition-all cursor-pointer"
              >
                <Globe className="h-3.5 w-3.5" />
                {localeNames[locale]}
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-[#12100c] border border-gold/10 z-50">
                  {(Object.keys(localeNames) as Locale[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLocale(l); setLangOpen(false); }}
                      className={cn(
                        "block w-full px-5 py-2.5 text-left text-[11px] tracking-wider uppercase transition-all cursor-pointer",
                        locale === l ? "text-gold bg-gold/5" : "text-cream/40 hover:text-gold hover:bg-gold/5"
                      )}
                    >
                      {localeNames[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/book">
              <button className="px-7 py-2.5 text-[13px] tracking-wider uppercase font-semibold text-charcoal bg-gradient-to-r from-gold-light via-gold to-gold-dark rounded-none hover:shadow-lg hover:shadow-gold/20 transition-all duration-300 cursor-pointer">
                {navLabels.bookNow}
              </button>
            </Link>
          </div>

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
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 py-6 space-y-1 bg-[#0d0b08]/95 backdrop-blur-2xl border-t border-gold/10">
          {navLinks.map((link) => {
            const label = navLabels[link.key];
            return link.href.startsWith("/") ? (
              <Link key={link.href} href={link.href}
                className="block px-4 py-3 text-[13px] tracking-wider uppercase text-cream/60 hover:text-gold hover:bg-gold/5 transition-all"
                onClick={() => setMobileOpen(false)}>
                {label}
              </Link>
            ) : (
              <a key={link.href} href={link.href}
                className="block px-4 py-3 text-[13px] tracking-wider uppercase text-cream/60 hover:text-gold hover:bg-gold/5 transition-all"
                onClick={() => setMobileOpen(false)}>
                {label}
              </a>
            );
          })}

          {/* Mobile language switcher */}
          <div className="flex gap-2 px-4 py-3">
            {(Object.keys(localeNames) as Locale[]).map((l) => (
              <button key={l}
                onClick={() => { setLocale(l); setMobileOpen(false); }}
                className={cn(
                  "px-4 py-2 text-[11px] tracking-wider uppercase font-medium transition-all cursor-pointer",
                  locale === l ? "bg-gold text-charcoal" : "border border-gold/10 text-cream/40"
                )}>
                {localeNames[l]}
              </button>
            ))}
          </div>

          <div className="pt-3">
            <Link href="/book" onClick={() => setMobileOpen(false)}>
              <button className="w-full py-3 text-[13px] tracking-wider uppercase font-semibold text-charcoal bg-gradient-to-r from-gold-light via-gold to-gold-dark cursor-pointer">
                {navLabels.bookNow}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
