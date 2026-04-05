"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Clock, Share2 } from "lucide-react";
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

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0d0b08] text-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-gold hover:text-gold-light transition-colors">
            &larr; Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const nextPost = blogPosts[currentIndex + 1] || null;
  const prevPost = blogPosts[currentIndex - 1] || null;

  return (
    <div className="min-h-screen bg-[#0d0b08] text-cream">
      <Navbar />

      {/* Hero image */}
      <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <Image src={post.image} alt={post.title} fill
          className="object-cover" style={{ objectPosition: post.imagePos }} quality={90} priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08] via-[#0d0b08]/50 to-[#0d0b08]/30" />
        <div className="absolute top-28 left-0 right-0 px-4">
          <div className="max-w-3xl mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-2 text-cream/40 hover:text-gold transition-colors text-sm">
              <ArrowLeft className="h-4 w-4" /> All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Article */}
      <section className="relative -mt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-gold text-charcoal text-[10px] font-bold tracking-widest uppercase mb-6">
                {post.category}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] mb-6">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-[11px] text-cream/30 tracking-wider uppercase mb-12">
                <span>{post.date}</span>
                <span className="h-3 w-px bg-gold/10" />
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
              </div>
            </div>
          </FadeIn>

          {/* Content */}
          <FadeIn delay={0.1}>
            <div className="space-y-6">
              {post.content.map((paragraph, i) => (
                <p key={i} className="text-cream/60 leading-[1.8] text-[17px]">
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeIn>

          {/* Share + tags */}
          <FadeIn delay={0.15}>
            <div className="mt-16 pt-8 border-t border-gold/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] tracking-wider uppercase text-cream/20">Category:</span>
                <span className="px-3 py-1 border border-gold/10 text-[10px] tracking-wider uppercase text-gold/60">
                  {post.category}
                </span>
              </div>
              <button
                onClick={() => navigator.clipboard?.writeText(window.location.href)}
                className="flex items-center gap-2 text-cream/30 hover:text-gold transition-colors text-sm cursor-pointer"
              >
                <Share2 className="h-4 w-4" /> Share
              </button>
            </div>
          </FadeIn>

          {/* Prev / Next */}
          <FadeIn delay={0.2}>
            <div className="mt-12 grid sm:grid-cols-2 gap-4">
              {prevPost ? (
                <Link href={`/blog/${prevPost.slug}`}
                  className="group p-6 border border-gold/5 hover:border-gold/15 transition-all">
                  <span className="text-[10px] tracking-wider uppercase text-cream/20 flex items-center gap-1 mb-2">
                    <ArrowLeft className="h-3 w-3" /> Previous
                  </span>
                  <p className="font-bold text-sm group-hover:text-gold-light transition-colors line-clamp-2">
                    {prevPost.title}
                  </p>
                </Link>
              ) : <div />}
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`}
                  className="group p-6 border border-gold/5 hover:border-gold/15 transition-all text-right">
                  <span className="text-[10px] tracking-wider uppercase text-cream/20 flex items-center justify-end gap-1 mb-2">
                    Next <ArrowRight className="h-3 w-3" />
                  </span>
                  <p className="font-bold text-sm group-hover:text-gold-light transition-colors line-clamp-2">
                    {nextPost.title}
                  </p>
                </Link>
              )}
            </div>
          </FadeIn>
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
