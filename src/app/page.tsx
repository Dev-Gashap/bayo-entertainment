"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Music,
  Mic2,
  Play,
  Star,
  MapPin,
  Clock,
  ArrowRight,
  Headphones,
  PartyPopper,
  Guitar,
  Globe,
  AtSign,
  Tv,
  Mail,
  Phone,
  Sparkles,
  Volume2,
  CirclePlay,
  ArrowUpRight,
  Quote,
  Trophy,
  Heart,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const marqueeWords = [
  "SAXOPHONE",
  "AFROBEATS",
  "R&B",
  "JAZZ",
  "GOSPEL",
  "HIGHLIFE",
  "AMAPIANO",
  "SOUL",
  "LIVE MUSIC",
  "WEDDINGS",
];

const stats = [
  { value: "500+", label: "Performances", icon: <Mic2 className="h-4 w-4" /> },
  { value: "50K+", label: "Happy Fans", icon: <Heart className="h-4 w-4" /> },
  { value: "12+", label: "Countries", icon: <Globe className="h-4 w-4" /> },
  { value: "15+", label: "Years", icon: <Trophy className="h-4 w-4" /> },
];

const services = [
  {
    icon: <Mic2 className="h-6 w-6" />,
    title: "Live Saxophone Shows",
    description:
      "Captivating live saxophone performances for concerts, festivals, and private events. From smooth jazz to high-energy Afrobeats.",
  },
  {
    icon: <PartyPopper className="h-6 w-6" />,
    title: "Wedding Entertainment",
    description:
      "Make your special day unforgettable with live saxophone music during the ceremony, cocktail hour, reception, and after-party.",
  },
  {
    icon: <Headphones className="h-6 w-6" />,
    title: "Corporate Events",
    description:
      "Elevate your corporate galas, award ceremonies, and business dinners with sophisticated live saxophone entertainment.",
  },
  {
    icon: <Guitar className="h-6 w-6" />,
    title: "Private Parties",
    description:
      "Birthday celebrations, anniversaries, holiday parties, and exclusive gatherings deserve world-class live music.",
  },
  {
    icon: <Volume2 className="h-6 w-6" />,
    title: "Festival Performances",
    description:
      "High-energy stage presence and electrifying saxophone performances that command festival crowds and leave them wanting more.",
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Custom Experiences",
    description:
      "Surprise proposals, yacht parties, rooftop sessions, dinner ambiance \u2014 tell us your vision and we\u2019ll create the perfect musical moment.",
  },
];

const albums = [
  {
    title: "Golden Hour",
    year: "2025",
    tracks: 12,
    image: "/images/hero-stage.jpeg",
  },
  {
    title: "Sax & The City",
    year: "2024",
    tracks: 10,
    image: "/images/closeup.jpeg",
  },
  {
    title: "Midnight Serenade",
    year: "2023",
    tracks: 14,
    image: "/images/backstage.jpeg",
  },
  {
    title: "Rise Up",
    year: "2022",
    tracks: 11,
    image: "/images/lounge.jpeg",
  },
];

const upcomingEvents = [
  {
    date: "Apr 26",
    day: "Sat",
    title: "Golden Hour Tour \u2014 Houston",
    venue: "House of Blues, Houston TX",
    time: "8:00 PM",
    status: "On Sale",
    statusColor: "bg-emerald-500",
  },
  {
    date: "May 10",
    day: "Sat",
    title: "Afrobeats Saxophone Night",
    venue: "Blue Note Jazz Club, New York",
    time: "9:00 PM",
    status: "On Sale",
    statusColor: "bg-emerald-500",
  },
  {
    date: "May 31",
    day: "Sat",
    title: "Summer Soiree \u2014 London",
    venue: "Ronnie Scott\u2019s Jazz Club, London",
    time: "8:30 PM",
    status: "VIP Only",
    statusColor: "bg-gold",
  },
  {
    date: "Jun 14",
    day: "Sat",
    title: "Corporate Excellence Gala",
    venue: "The Ritz-Carlton, Atlanta GA",
    time: "7:00 PM",
    status: "Sold Out",
    statusColor: "bg-rose-500",
  },
  {
    date: "Jul 4",
    day: "Fri",
    title: "Independence Day Celebration",
    venue: "The Beverly Hilton, Los Angeles",
    time: "7:30 PM",
    status: "Coming Soon",
    statusColor: "bg-amber-600",
  },
];

const testimonials = [
  {
    name: "Jessica & David Thompson",
    role: "Wedding \u2014 The Woodlands, TX",
    quote:
      "Bayo played our wedding ceremony, cocktail hour, AND reception. Our guests could not stop talking about the saxophone. It was the highlight of the entire night. Truly magical.",
    rating: 5,
  },
  {
    name: "Marcus Williams",
    role: "VP Events, Goldman Sachs",
    quote:
      "We\u2019ve booked Bayo for three consecutive corporate galas. The sophistication, energy, and pure talent are unmatched. He reads the room perfectly every single time.",
    rating: 5,
  },
  {
    name: "Amara Okafor",
    role: "Celebrity Event Planner, Atlanta",
    quote:
      "Bayo is my number one recommendation for any high-end event. His stage presence is magnetic, and his saxophone playing brings an atmosphere no DJ can replicate.",
    rating: 5,
  },
];

const pricingPackages = [
  {
    name: "Intimate",
    price: "$1,500",
    description: "Private dinners & small gatherings",
    features: [
      "Solo saxophone (up to 2 hours)",
      "Custom song selection",
      "Background & ambient music",
      "Professional sound setup",
      "Travel within metro area",
    ],
    featured: false,
  },
  {
    name: "Premium",
    price: "$3,500",
    description: "Weddings & mid-size events",
    features: [
      "Solo saxophone (up to 4 hours)",
      "Ceremony + reception sets",
      "DJ collaboration set",
      "Custom arrangements",
      "Full sound & wireless setup",
      "Professional lighting",
    ],
    featured: true,
  },
  {
    name: "Headline",
    price: "Custom",
    description: "Concerts, festivals & galas",
    features: [
      "Full-length performance",
      "Band & backing musicians",
      "Stage production setup",
      "Sound engineering team",
      "Dedicated event coordination",
      "Video & photo coverage",
      "After-party set included",
    ],
    featured: false,
  },
];

/* ═══════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════ */

function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
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

function ScaleIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="h-px w-10 bg-gradient-to-r from-gold to-transparent" />
      <span className={cn("text-[11px] font-bold tracking-[0.35em] uppercase", light ? "text-gold-dark" : "text-gold")}>
        {children}
      </span>
      <div className="h-px w-10 bg-gradient-to-l from-gold to-transparent" />
    </div>
  );
}

function GoldDivider() {
  return <div className="gold-divider w-full" />;
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen bg-[#0d0b08] text-cream">
      <Navbar />

      {/* ═══════════════════════════════════
          HERO \u2014 Video background
          ═══════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Video background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/images/hero-stage.jpeg"
          >
            <source src="/images/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0b08] via-[#0d0b08]/70 to-[#0d0b08]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08] via-transparent to-[#0d0b08]/40" />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl pt-20">
            <FadeIn>
              <div className="inline-flex items-center gap-3 px-5 py-2 border border-gold/20 bg-gold/5 backdrop-blur-sm text-gold text-[11px] tracking-[0.3em] uppercase font-medium mb-10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
                </span>
                Houston, TX &bull; Available Worldwide
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95]">
                THE ART
                <br />
                OF THE
                <br />
                <span className="gradient-text-gold">SAXOPHONE</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="mt-8 text-lg sm:text-xl text-cream/50 max-w-lg leading-relaxed">
                World-class saxophone performances for concerts, weddings,
                corporate events, and private celebrations. Every note crafted
                to perfection.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-12 flex flex-col sm:flex-row items-start gap-4">
                <a href="#booking">
                  <button className="group px-10 py-4 text-[13px] tracking-wider uppercase font-bold text-charcoal bg-gradient-to-r from-gold-light via-gold to-gold-dark hover:shadow-2xl hover:shadow-gold/20 transition-all duration-500 cursor-pointer flex items-center gap-3">
                    Book a Performance
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </a>
                <a href="#music">
                  <button className="group px-10 py-4 text-[13px] tracking-wider uppercase font-medium text-gold border border-gold/30 hover:bg-gold/5 transition-all duration-300 cursor-pointer flex items-center gap-3">
                    <CirclePlay className="h-4 w-4" />
                    Listen
                  </button>
                </a>
              </div>
            </FadeIn>

            {/* Stats bar */}
            <FadeIn delay={0.55}>
              <div className="mt-20 flex flex-wrap gap-8 sm:gap-12">
                {stats.map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div className="text-gold/30">{stat.icon}</div>
                    <div>
                      <p className="text-2xl sm:text-3xl font-black gradient-text-gold">{stat.value}</p>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-cream/25">{stat.label}</p>
                    </div>
                    {i < stats.length - 1 && (
                      <div className="hidden sm:block w-px h-10 bg-gold/10 ml-4" />
                    )}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </motion.div>

        {/* Scroll line */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[10px] tracking-[0.3em] uppercase text-cream/20">Scroll</span>
          <motion.div
            animate={{ height: ["16px", "32px", "16px"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px bg-gradient-to-b from-gold/40 to-transparent"
          />
        </div>
      </section>

      {/* ═══════════════════════════════════
          MARQUEE
          ═══════════════════════════════════ */}
      <section className="py-6 border-y border-gold/5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...marqueeWords, ...marqueeWords].map((word, i) => (
            <span key={i} className="mx-8 text-xl sm:text-2xl font-black text-gold/[0.04] uppercase tracking-[0.2em] select-none">
              {word}
              <span className="mx-8 text-gold/[0.08]">\u2022</span>
            </span>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════
          ABOUT \u2014 with formal photo
          ═══════════════════════════════════ */}
      <section id="about" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Photo side */}
            <FadeIn>
              <div className="relative">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <Image
                    src="/images/hero-formal.jpeg"
                    alt="Bayo in formal attire with saxophone"
                    fill
                    className="object-cover"
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08] via-transparent to-transparent opacity-40" />
                </div>
                {/* Gold accent frame */}
                <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold/30" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold/30" />

                {/* Floating stat card */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -right-6 sm:right-6 glass-dark rounded-none p-5 border border-gold/10"
                >
                  <p className="text-3xl font-black gradient-text-gold">15+</p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-cream/40 mt-1">Years of Excellence</p>
                </motion.div>
              </div>
            </FadeIn>

            {/* Text side */}
            <FadeIn delay={0.2}>
              <div>
                <SectionLabel>About</SectionLabel>
                <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.05] mb-8">
                  Excellence Is
                  <br />
                  <span className="gradient-text-gold">Not Optional.</span>
                </h2>
                <div className="space-y-5 text-cream/50 leading-relaxed text-[16px]">
                  <p>
                    <span className="text-cream font-medium">Bayo</span> is a world-class saxophonist based in{" "}
                    <span className="text-gold">Houston, Texas</span> \u2014 known for commanding
                    stages with a rare blend of technical mastery, emotional depth,
                    and show-stopping energy.
                  </p>
                  <p>
                    With over <span className="text-cream font-medium">500 performances</span> across{" "}
                    <span className="text-cream font-medium">12 countries</span>, Bayo has graced
                    corporate galas, celebrity weddings, international festivals,
                    and intimate private events with equal brilliance.
                  </p>
                  <p>
                    From the smooth melodies of jazz to the pulsating rhythms of
                    Afrobeats \u2014 every performance is a masterclass in musical
                    excellence.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 mt-10">
                  {["Jazz", "Afrobeats", "R&B", "Gospel", "Highlife", "Amapiano", "Soul", "Pop"].map(
                    (genre) => (
                      <span
                        key={genre}
                        className="px-5 py-2 text-[11px] tracking-wider uppercase text-gold/60 border border-gold/10 hover:border-gold/30 hover:text-gold transition-all duration-300 cursor-default"
                      >
                        {genre}
                      </span>
                    )
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ═══════════════════════════════════
          SERVICES
          ═══════════════════════════════════ */}
      <section id="services" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-20">
              <SectionLabel>Services</SectionLabel>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                Performances That
                <br />
                <span className="gradient-text-gold">Speak Excellence</span>
              </h2>
              <p className="mt-5 text-lg text-cream/40 max-w-xl mx-auto">
                Every event deserves a soundtrack that elevates the moment.
              </p>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/5">
            {services.map((s, i) => (
              <ScaleIn key={s.title} delay={i * 0.06}>
                <div className="group p-10 bg-[#0d0b08] hover:bg-gold/[0.03] transition-all duration-500 h-full relative">
                  <div className="text-gold/40 group-hover:text-gold transition-colors duration-500 mb-6">
                    {s.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-cream group-hover:text-gold-light transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-sm text-cream/40 leading-relaxed">{s.description}</p>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-gold to-gold-light group-hover:w-full transition-all duration-700" />
                </div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          VIDEO TEASER \u2014 Links to Spotlight page
          ═══════════════════════════════════ */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <SectionLabel>Watch</SectionLabel>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                See The <span className="gradient-text-gold">Magic</span>
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link href="/spotlight" className="block group relative aspect-video max-w-4xl mx-auto overflow-hidden cursor-pointer">
              <video
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                autoPlay
                poster="/images/hero-stage.jpeg"
              >
                <source src="/images/hero-video.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="h-20 w-20 border-2 border-gold/60 bg-gold/10 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-8 w-8 text-gold ml-1" />
                </div>
                <p className="text-[11px] tracking-[0.35em] uppercase text-gold font-bold mb-2">Spotlight</p>
                <p className="text-xl sm:text-2xl font-black">Watch Full Performances</p>
                <p className="text-sm text-cream/40 mt-2 flex items-center gap-2">
                  View all videos <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            </Link>
          </FadeIn>
        </div>
      </section>

      <GoldDivider />

      {/* ═══════════════════════════════════
          FEATURED IMAGE \u2014 Full-width cinematic
          ═══════════════════════════════════ */}
      <section className="relative h-[60vh] sm:h-[70vh] overflow-hidden">
        <Image
          src="/images/lounge.jpeg"
          alt="Bayo in a relaxed setting with saxophone"
          fill
          className="object-cover object-center"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08] via-[#0d0b08]/30 to-[#0d0b08]/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <FadeIn>
            <div className="text-center">
              <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-4">Available For</p>
              <p className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                Weddings &bull; Concerts &bull; Galas
              </p>
              <p className="text-lg text-cream/40 mt-4">Anywhere in the world</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════
          MUSIC
          ═══════════════════════════════════ */}
      <section id="music" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-20">
              <SectionLabel>Discography</SectionLabel>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                The <span className="gradient-text-gold">Music</span>
              </h2>
              <p className="mt-4 text-cream/40 max-w-md mx-auto">
                Original compositions and live recordings. Every note is intentional.
              </p>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {albums.map((album, i) => (
              <FadeIn key={album.title} delay={i * 0.1}>
                <div className="group cursor-pointer">
                  <div className="aspect-square relative overflow-hidden mb-5 image-shine">
                    <Image
                      src={album.image}
                      alt={album.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      quality={80}
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="h-16 w-16 border-2 border-gold/60 bg-gold/10 backdrop-blur-sm flex items-center justify-center">
                        <Play className="h-6 w-6 text-gold ml-1" />
                      </div>
                    </div>
                    {/* Year */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-[10px] tracking-widest uppercase text-gold font-bold">
                      {album.year}
                    </div>
                  </div>
                  <h3 className="font-bold text-base group-hover:text-gold transition-colors duration-300">{album.title}</h3>
                  <p className="text-xs text-cream/30 mt-1">{album.tracks} tracks</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ═══════════════════════════════════
          EVENTS
          ═══════════════════════════════════ */}
      <section id="events" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-20">
              <SectionLabel>Upcoming Shows</SectionLabel>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                See Bayo <span className="gradient-text-gold">Live</span>
              </h2>
            </div>
          </FadeIn>
          <div className="max-w-4xl mx-auto space-y-3">
            {upcomingEvents.map((event, i) => (
              <FadeIn key={event.title} delay={i * 0.06}>
                <div className="group flex items-center gap-4 sm:gap-6 p-6 border border-gold/5 hover:border-gold/15 hover:bg-gold/[0.02] transition-all duration-500 cursor-pointer">
                  {/* Date */}
                  <div className="text-center min-w-[50px]">
                    <p className="text-[10px] text-cream/20 uppercase tracking-wider">{event.day}</p>
                    <p className="text-2xl font-black gradient-text-gold leading-none my-1">
                      {event.date.split(" ")[1]}
                    </p>
                    <p className="text-[10px] text-cream/20 uppercase tracking-wider">{event.date.split(" ")[0]}</p>
                  </div>

                  <div className="h-12 w-px bg-gold/10" />

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base sm:text-lg truncate group-hover:text-gold-light transition-colors duration-300">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-1.5 flex-wrap">
                      <span className="flex items-center gap-1.5 text-xs text-cream/30">
                        <MapPin className="h-3 w-3" />
                        {event.venue}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-cream/30">
                        <Clock className="h-3 w-3" />
                        {event.time}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span
                      className={cn(
                        "hidden sm:inline-flex px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white",
                        event.statusColor
                      )}
                    >
                      {event.status}
                    </span>
                    <div className="h-9 w-9 border border-gold/10 flex items-center justify-center group-hover:border-gold/30 group-hover:bg-gold/5 transition-all">
                      <ArrowUpRight className="h-3.5 w-3.5 text-cream/30 group-hover:text-gold transition-colors" />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          GALLERY \u2014 With real photos
          ═══════════════════════════════════ */}
      <section id="gallery" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-20">
              <SectionLabel>Gallery</SectionLabel>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                Moments of <span className="gradient-text-gold">Excellence</span>
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[220px] lg:auto-rows-[260px]">
            {[
              { src: "/images/hero-stage.jpeg", label: "Live Performance", span: "col-span-2 row-span-2" },
              { src: "/images/hero-formal.jpeg", label: "Black Tie Event", span: "" },
              { src: "/images/backstage.jpeg", label: "Backstage", span: "" },
              { src: "/images/lounge.jpeg", label: "Studio Session", span: "col-span-2" },
              { src: "/images/closeup.jpeg", label: "Portrait", span: "" },
            ].map((item, i) => (
              <ScaleIn key={item.label} delay={i * 0.06}>
                <div className={cn("group relative overflow-hidden cursor-pointer image-shine h-full", item.span)}>
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-xs tracking-widest uppercase text-gold font-medium">{item.label}</p>
                  </div>
                </div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ═══════════════════════════════════
          TESTIMONIALS
          ═══════════════════════════════════ */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-20">
              <SectionLabel>Testimonials</SectionLabel>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                Words From <span className="gradient-text-gold">Clients</span>
              </h2>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.1}>
                <div className="p-8 border border-gold/5 hover:border-gold/15 transition-all duration-500 h-full flex flex-col relative group">
                  {/* Gold corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/20 group-hover:border-gold/40 transition-colors" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/20 group-hover:border-gold/40 transition-colors" />

                  <Quote className="h-8 w-8 text-gold/15 mb-6" />
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-cream/60 leading-relaxed mb-8 flex-1 text-[15px]">
                    {t.quote}
                  </p>
                  <div>
                    <p className="font-bold text-sm text-cream">{t.name}</p>
                    <p className="text-[11px] text-cream/30 tracking-wider uppercase mt-1">{t.role}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FULL-WIDTH PHOTO BREAK \u2014 Backstage
          ═══════════════════════════════════ */}
      <section className="relative h-[50vh] overflow-hidden">
        <Image
          src="/images/backstage.jpeg"
          alt="Bayo backstage"
          fill
          className="object-cover object-center"
          quality={90}
        />
        <div className="absolute inset-0 bg-[#0d0b08]/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <FadeIn>
            <p className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-center px-4">
              &ldquo;Music is the universal language of{" "}
              <span className="gradient-text-gold">excellence</span>.&rdquo;
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════
          PRICING / BOOKING
          ═══════════════════════════════════ */}
      <section id="booking" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-20">
              <SectionLabel>Packages</SectionLabel>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                Book Your <span className="gradient-text-gold">Experience</span>
              </h2>
              <p className="mt-4 text-cream/40 max-w-lg mx-auto">
                Each performance is tailored to your event. Choose a starting package or request a custom quote.
              </p>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPackages.map((pkg, i) => (
              <ScaleIn key={pkg.name} delay={i * 0.1}>
                <div
                  className={cn(
                    "p-8 h-full flex flex-col transition-all duration-500 relative",
                    pkg.featured
                      ? "border-2 border-gold/30 bg-gold/[0.03]"
                      : "border border-gold/5 hover:border-gold/15"
                  )}
                >
                  {pkg.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-5 py-1 bg-gradient-to-r from-gold-light via-gold to-gold-dark text-charcoal text-[10px] font-bold uppercase tracking-[0.2em]">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <h3 className="text-sm font-bold tracking-wider uppercase text-cream/60">{pkg.name}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-black gradient-text-gold">{pkg.price}</span>
                  </div>
                  <p className="mt-2 text-xs text-cream/30">{pkg.description}</p>

                  <button
                    className={cn(
                      "mt-8 w-full py-3.5 text-[12px] tracking-wider uppercase font-semibold transition-all duration-300 cursor-pointer",
                      pkg.featured
                        ? "bg-gradient-to-r from-gold-light via-gold to-gold-dark text-charcoal hover:shadow-lg hover:shadow-gold/15"
                        : "border border-gold/20 text-gold hover:bg-gold/5"
                    )}
                  >
                    {pkg.featured ? "Get Started" : "Learn More"}
                  </button>

                  <ul className="mt-8 space-y-3.5 flex-1">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <svg className={cn("h-4 w-4 mt-0.5 flex-shrink-0", pkg.featured ? "text-gold" : "text-gold/30")} viewBox="0 0 16 16" fill="none">
                          <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                        </svg>
                        <span className="text-sm text-cream/50">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ═══════════════════════════════════
          CONTACT
          ═══════════════════════════════════ */}
      <section id="contact" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20">
            <FadeIn>
              <div>
                <SectionLabel>Get In Touch</SectionLabel>
                <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-8">
                  Let&apos;s Create
                  <br />
                  <span className="gradient-text-gold">Something Timeless</span>
                </h2>
                <p className="text-cream/40 text-lg leading-relaxed mb-10">
                  Planning an event? Whether you&apos;re in Houston or halfway
                  across the globe \u2014 let&apos;s discuss how to make your event
                  unforgettable.
                </p>

                <div className="space-y-6">
                  {[
                    { icon: <Mail className="h-5 w-5" />, label: "Email", value: "hello@bayoentertainment.com" },
                    { icon: <Phone className="h-5 w-5" />, label: "Phone", value: "+1 (832) 555-BAYO" },
                    { icon: <MapPin className="h-5 w-5" />, label: "Based In", value: "Houston, Texas, USA" },
                    { icon: <Globe className="h-5 w-5" />, label: "Performs In", value: "USA, Europe, Africa, Caribbean & Beyond" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <div className="h-12 w-12 border border-gold/15 flex items-center justify-center text-gold/60">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-cream/20">{item.label}</p>
                        <p className="text-cream/70 font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-10">
                  {[
                    { icon: <AtSign className="h-5 w-5" />, label: "Instagram" },
                    { icon: <Globe className="h-5 w-5" />, label: "Twitter/X" },
                    { icon: <Tv className="h-5 w-5" />, label: "YouTube" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href="#"
                      className="h-11 w-11 border border-gold/10 flex items-center justify-center text-cream/30 hover:text-gold hover:border-gold/30 hover:bg-gold/5 transition-all duration-300"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <form className="space-y-5 border border-gold/10 p-8 sm:p-10">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.25em] uppercase text-cream/30 mb-2">Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full px-5 py-3.5 bg-gold/[0.03] border border-gold/10 text-cream placeholder-cream/20 focus:outline-none focus:border-gold/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.25em] uppercase text-cream/30 mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      className="w-full px-5 py-3.5 bg-gold/[0.03] border border-gold/10 text-cream placeholder-cream/20 focus:outline-none focus:border-gold/30 transition-colors"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.25em] uppercase text-cream/30 mb-2">Event Type</label>
                    <select className="w-full px-5 py-3.5 bg-gold/[0.03] border border-gold/10 text-cream focus:outline-none focus:border-gold/30 transition-colors appearance-none">
                      <option value="" className="bg-charcoal">Select type</option>
                      <option value="wedding" className="bg-charcoal">Wedding</option>
                      <option value="corporate" className="bg-charcoal">Corporate Event</option>
                      <option value="birthday" className="bg-charcoal">Private Party</option>
                      <option value="concert" className="bg-charcoal">Concert / Show</option>
                      <option value="festival" className="bg-charcoal">Festival</option>
                      <option value="other" className="bg-charcoal">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.25em] uppercase text-cream/30 mb-2">Event Date</label>
                    <input
                      type="date"
                      className="w-full px-5 py-3.5 bg-gold/[0.03] border border-gold/10 text-cream focus:outline-none focus:border-gold/30 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-[0.25em] uppercase text-cream/30 mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="City, State or Country"
                    className="w-full px-5 py-3.5 bg-gold/[0.03] border border-gold/10 text-cream placeholder-cream/20 focus:outline-none focus:border-gold/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-[0.25em] uppercase text-cream/30 mb-2">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your event..."
                    className="w-full px-5 py-3.5 bg-gold/[0.03] border border-gold/10 text-cream placeholder-cream/20 focus:outline-none focus:border-gold/30 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-gold-light via-gold to-gold-dark text-charcoal font-bold text-[12px] tracking-wider uppercase hover:shadow-lg hover:shadow-gold/15 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Send Inquiry
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          CTA
          ═══════════════════════════════════ */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/closeup.jpeg"
            alt="Bayo closeup"
            fill
            className="object-cover object-top opacity-20"
            quality={80}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08] via-[#0d0b08]/80 to-[#0d0b08]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-gold to-transparent mb-10" />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95]">
              YOUR EVENT DESERVES
              <br />
              <span className="gradient-text-gold">EXCELLENCE</span>
            </h2>
            <p className="mt-8 text-lg text-cream/40 max-w-xl mx-auto">
              From the first note to the last encore \u2014 every performance is
              a masterpiece.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#booking">
                <button className="group px-12 py-5 text-[13px] tracking-wider uppercase font-bold text-charcoal bg-gradient-to-r from-gold-light via-gold to-gold-dark hover:shadow-2xl hover:shadow-gold/20 transition-all duration-500 cursor-pointer flex items-center gap-3">
                  Book Now
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </a>
              <a href="#contact">
                <button className="px-12 py-5 text-[13px] tracking-wider uppercase font-medium text-gold border border-gold/20 hover:bg-gold/5 transition-all duration-300 cursor-pointer flex items-center gap-3">
                  <Mail className="h-4 w-4" />
                  Contact
                </button>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FOOTER
          ═══════════════════════════════════ */}
      <footer className="border-t border-gold/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 border border-gold/20 flex items-center justify-center text-gold">
                  <Music className="h-4 w-4" />
                </div>
                <p className="text-2xl font-black tracking-tight">
                  BAYO<span className="text-gold">.</span>
                </p>
              </div>
              <p className="text-xs text-cream/20 leading-relaxed">
                World-class saxophone performances.
                <br />
                Based in Houston, Texas.
                <br />
                Performing worldwide.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-cream/30 mb-5">Navigate</h4>
              <ul className="space-y-3 text-sm text-cream/20">
                {["About", "Services", "Music", "Events", "Gallery", "Contact"].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="hover:text-gold transition-colors underline-grow">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-cream/30 mb-5">Services</h4>
              <ul className="space-y-3 text-sm text-cream/20">
                {["Live Performances", "Weddings", "Corporate Events", "Festivals", "Private Parties"].map((s) => (
                  <li key={s}>
                    <a href="#services" className="hover:text-gold transition-colors underline-grow">{s}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-cream/30 mb-5">Connect</h4>
              <ul className="space-y-3 text-sm text-cream/20">
                {["Instagram", "Twitter / X", "YouTube", "TikTok", "Spotify"].map((s) => (
                  <li key={s}>
                    <a href="#" className="hover:text-gold transition-colors underline-grow">{s}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gold/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-cream/15 tracking-wider">
            <p>&copy; 2026 Bayo Entertainment. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-gold transition-colors">Terms</a>
              <a href="#" className="hover:text-gold transition-colors">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
