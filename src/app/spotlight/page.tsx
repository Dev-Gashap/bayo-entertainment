"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  Volume2,
  VolumeOff,
  ArrowLeft,
  Music,
  Sparkles,
  ArrowRight,
  Maximize,
} from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { cn } from "@/lib/utils";

/* ─── Video data ─── */

const videos = [
  {
    id: "reel-1",
    src: "/images/hero-video.mp4",
    poster: "/images/hero-stage.jpeg",
    title: "Live Saxophone Session",
    subtitle: "Performance Reel",
    description:
      "Watch Bayo bring the house down with a captivating live saxophone performance. Raw energy, smooth melodies, and stage presence that commands every room.",
    tags: ["Live Performance", "Saxophone", "Stage"],
  },
  {
    id: "reel-2",
    src: "/images/performance-video.mp4",
    poster: "/images/closeup.jpeg",
    title: "Concert Highlights",
    subtitle: "Stage Highlights",
    description:
      "A highlight reel from recent concerts and shows. From intimate jazz sets to high-energy festival performances — this is what excellence sounds like.",
    tags: ["Concert", "Highlights", "Live Music"],
  },
];

/* ─── Animation helpers ─── */

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

/* ─── Video Player Component ─── */

function VideoPlayer({
  video,
  index,
}: {
  video: (typeof videos)[0];
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      setHasStarted(true);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const pct =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(pct);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pct * videoRef.current.duration;
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <FadeIn delay={index * 0.15}>
      <div className="group">
        {/* Video container */}
        <div className="relative aspect-video overflow-hidden bg-black cursor-pointer" onClick={togglePlay}>
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted={isMuted}
            loop
            playsInline
            poster={video.poster}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
          >
            <source src={video.src} type="video/mp4" />
          </video>

          {/* Overlay — shows when not playing or on hover */}
          <div
            className={cn(
              "absolute inset-0 bg-black/40 transition-opacity duration-500",
              isPlaying && hasStarted ? "opacity-0 group-hover:opacity-100" : "opacity-100"
            )}
          />

          {/* Big play button center */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="h-20 w-20 sm:h-24 sm:w-24 border-2 border-gold/60 bg-gold/10 backdrop-blur-sm flex items-center justify-center hover:bg-gold/20 transition-all duration-300"
              >
                <Play className="h-8 w-8 sm:h-10 sm:w-10 text-gold ml-1" />
              </motion.div>
            </div>
          )}

          {/* Subtitle badge top-left */}
          <div className="absolute top-4 left-4 px-4 py-1.5 bg-black/50 backdrop-blur-sm border border-gold/10">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold font-bold">
              {video.subtitle}
            </p>
          </div>

          {/* Controls bar — bottom */}
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300",
              isPlaying && hasStarted ? "opacity-0 group-hover:opacity-100" : "opacity-100"
            )}
          >
            {/* Progress bar */}
            <div
              className="w-full h-1 bg-white/10 mb-3 cursor-pointer group/progress"
              onClick={(e) => { e.stopPropagation(); handleSeek(e); }}
            >
              <div
                className="h-full bg-gradient-to-r from-gold-light via-gold to-gold-dark relative transition-all"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 bg-gold rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                  className="h-8 w-8 flex items-center justify-center text-cream/70 hover:text-gold transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                  className="h-8 w-8 flex items-center justify-center text-cream/70 hover:text-gold transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeOff className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                className="h-8 w-8 flex items-center justify-center text-cream/70 hover:text-gold transition-colors cursor-pointer"
              >
                <Maximize className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Video info below */}
        <div className="mt-6 sm:mt-8">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            {video.title}
          </h3>
          <p className="text-cream/40 mt-3 leading-relaxed max-w-2xl">
            {video.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {video.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 text-[10px] tracking-wider uppercase text-gold/50 border border-gold/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ─── Page ─── */

export default function SpotlightPage() {
  return (
    <div className="min-h-screen bg-[#0d0b08] text-cream">
      <Navbar />

      {/* Hero header */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[150px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-cream/30 hover:text-gold transition-colors text-sm mb-10"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-gradient-to-r from-gold to-transparent" />
              <span className="text-[11px] font-bold tracking-[0.35em] uppercase text-gold">
                Spotlight
              </span>
              <div className="h-px w-10 bg-gradient-to-l from-gold to-transparent" />
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95]">
              IN THE
              <br />
              <span className="gradient-text-gold">SPOTLIGHT</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className="mt-6 text-lg text-cream/40 max-w-xl">
              Watch Bayo in action. Live performances, concert highlights, and
              behind-the-scenes moments that capture the essence of
              world-class saxophone artistry.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Gold divider */}
      <div className="gold-divider w-full" />

      {/* Videos */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {videos.map((video, i) => (
            <VideoPlayer key={video.id} video={video} index={i} />
          ))}
        </div>
      </section>

      {/* Gold divider */}
      <div className="gold-divider w-full" />

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-[11px] tracking-[0.35em] uppercase text-gold mb-6">
              Like What You See?
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Book Bayo For Your{" "}
              <span className="gradient-text-gold">Next Event</span>
            </h2>
            <p className="mt-4 text-cream/40 max-w-md mx-auto">
              From intimate gatherings to sold-out arenas — every performance
              is crafted to perfection.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/#booking">
                <button className="group px-10 py-4 text-[13px] tracking-wider uppercase font-bold text-charcoal bg-gradient-to-r from-gold-light via-gold to-gold-dark hover:shadow-2xl hover:shadow-gold/20 transition-all duration-500 cursor-pointer flex items-center gap-3">
                  Book Now
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/#contact">
                <button className="px-10 py-4 text-[13px] tracking-wider uppercase font-medium text-gold border border-gold/30 hover:bg-gold/5 transition-all duration-300 cursor-pointer">
                  Contact
                </button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer mini */}
      <footer className="border-t border-gold/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-cream/15 tracking-wider">
          <p>&copy; 2026 Bayo Entertainment. All rights reserved.</p>
          <Link href="/" className="text-cream/30 hover:text-gold transition-colors flex items-center gap-2">
            <Music className="h-3.5 w-3.5" />
            BAYO.
          </Link>
        </div>
      </footer>
    </div>
  );
}
