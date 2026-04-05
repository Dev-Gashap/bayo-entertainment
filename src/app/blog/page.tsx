"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { blogPosts } from "@/lib/blog-data";

function FadeIn({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>{children}</motion.div>
  );
}

export default function BlogPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

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
              <span className="text-[11px] font-bold tracking-[0.35em] uppercase text-gold">Blog</span>
              <div className="h-px w-10 bg-gradient-to-l from-gold to-transparent" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95]">
              NEWS &
              <br />
              <span className="gradient-text-gold">STORIES</span>
            </h1>
            <p className="mt-6 text-cream/40 max-w-lg">
              Tour announcements, behind-the-scenes moments, event planning guides, and press features.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="gold-divider w-full" />

      {/* Featured post */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Link href={`/blog/${featured.slug}`} className="group grid lg:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={featured.image} alt={featured.title} fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: featured.imagePos }} quality={80} />
                <div className="absolute top-4 left-4 px-3 py-1 bg-gold text-charcoal text-[10px] font-bold tracking-widest uppercase">
                  {featured.category}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 text-[10px] text-cream/25 tracking-wider uppercase mb-4">
                  <span>{featured.date}</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {featured.readTime}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight group-hover:text-gold-light transition-colors duration-300 mb-4">
                  {featured.title}
                </h2>
                <p className="text-cream/40 leading-relaxed mb-6">{featured.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold group-hover:gap-3 transition-all">
                  Read Article <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </FadeIn>
        </div>
      </section>

      <div className="gold-divider w-full" />

      {/* All posts grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.08}>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <div className="border border-gold/5 hover:border-gold/15 transition-all duration-500 h-full flex flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={post.image} alt={post.title} fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ objectPosition: post.imagePos }} quality={80} />
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-[9px] font-bold tracking-widest uppercase text-gold">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-[10px] text-cream/20 tracking-wider uppercase mb-3">
                        <span>{post.date}</span>
                        <span>&bull;</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="font-bold text-base group-hover:text-gold-light transition-colors duration-300 mb-3 flex-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-cream/30 line-clamp-2">{post.excerpt}</p>
                      <span className="inline-flex items-center gap-2 text-gold text-xs font-semibold mt-4 group-hover:gap-3 transition-all">
                        Read <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-gold/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[11px] text-cream/15 tracking-wider">
          <p>&copy; 2026 Bayo Entertainment. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
