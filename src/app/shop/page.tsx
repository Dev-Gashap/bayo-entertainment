"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingBag,
  X,
  Plus,
  Minus,
  Music,
  Truck,
  Shield,
  CreditCard,
  Disc3,
  Disc,
  Shirt,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { cn } from "@/lib/utils";
import { products, type Product } from "@/lib/shop-data";

/* ─── Product icon renderer ─── */
function ProductIcon({ type, className }: { type: string; className?: string }) {
  const cls = cn("text-gold/70", className);
  switch (type) {
    case "vinyl":
      return (
        <div className="relative">
          <Disc3 className={cn(cls, "animate-spin-slow")} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-gold/20" />
          </div>
        </div>
      );
    case "cd":
      return <Disc className={cls} />;
    case "tshirt":
      return <Shirt className={cls} />;
    case "hoodie":
      return (
        <svg className={cls} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10L10 18V30H18V54H46V30H54V18L42 10" />
          <path d="M22 10C22 10 26 16 32 16C38 16 42 10 42 10" />
          <path d="M22 10L26 6H38L42 10" />
        </svg>
      );
    case "download":
      return <Download className={cls} />;
    case "cap":
      return (
        <svg className={cls} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 36C8 36 12 24 32 24C52 24 56 36 56 36" />
          <path d="M8 36C8 36 8 44 32 44C56 44 56 36 56 36" />
          <path d="M56 36H62" />
          <path d="M20 24V18C20 18 24 12 32 12C40 12 44 18 44 18V24" />
        </svg>
      );
    default:
      return <Music className={cls} />;
  }
}

/* ─── Product visual card ─── */
function ProductVisual({ product, size = "md" }: { product: Product; size?: "sm" | "md" }) {
  const iconSize = size === "sm" ? "h-10 w-10" : "h-16 w-16";
  return (
    <div className={cn("relative bg-gradient-to-br flex items-center justify-center overflow-hidden", product.gradient, size === "sm" ? "h-full w-full" : "aspect-square w-full")}>
      {/* Decorative circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-[0.03]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 rounded-full border border-white" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 rounded-full border border-white" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-96 rounded-full border border-white" />
        </div>
      </div>
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }} />
      {/* Product name watermark */}
      <div className="absolute bottom-4 left-4 right-4">
        <p className="text-[9px] tracking-[0.3em] uppercase text-white/10 font-bold truncate">{product.name}</p>
      </div>
      {/* Icon */}
      <div className="relative z-10">
        <ProductIcon type={product.icon} className={iconSize} />
      </div>
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 px-3 py-1 bg-gold text-charcoal text-[9px] font-bold tracking-widest uppercase z-10">
          {product.badge}
        </div>
      )}
      {/* BAYO. branding */}
      <div className="absolute top-3 right-3 text-[10px] font-black text-white/10 tracking-tight">
        BAYO<span className="text-gold/20">.</span>
      </div>
    </div>
  );
}

interface CartItem {
  product: Product;
  quantity: number;
  variant?: string;
}

function FadeIn({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>{children}</motion.div>
  );
}

export default function ShopPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [filter, setFilter] = useState("All");
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = filter === "All" ? products : products.filter((p) => p.category === filter);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: Product, variant?: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && i.variant === variant);
      if (existing) {
        return prev.map((i) => i.product.id === product.id && i.variant === variant ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { product, quantity: 1, variant }];
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart((prev) => prev.map((item, i) => i === index ? { ...item, quantity: item.quantity + delta } : item).filter((item) => item.quantity > 0));
  };

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
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px w-10 bg-gradient-to-r from-gold to-transparent" />
                  <span className="text-[11px] font-bold tracking-[0.35em] uppercase text-gold">Shop</span>
                  <div className="h-px w-10 bg-gradient-to-l from-gold to-transparent" />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95]">
                  OFFICIAL
                  <br />
                  <span className="gradient-text-gold">MERCH</span>
                </h1>
              </div>
              <button onClick={() => setCartOpen(true)}
                className="relative h-12 w-12 border border-gold/20 flex items-center justify-center text-cream/50 hover:text-gold hover:border-gold/40 transition-all cursor-pointer">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 bg-gold text-charcoal text-[10px] font-bold flex items-center justify-center">{cartCount}</span>
                )}
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex flex-wrap gap-6 mt-10">
              {[
                { icon: <Truck className="h-4 w-4" />, text: "Free shipping over $50" },
                { icon: <Shield className="h-4 w-4" />, text: "Secure checkout" },
                { icon: <CreditCard className="h-4 w-4" />, text: "All cards accepted" },
              ].map((perk) => (
                <div key={perk.text} className="flex items-center gap-2 text-cream/25 text-xs">
                  <span className="text-gold/40">{perk.icon}</span>{perk.text}
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex gap-2 mt-10 flex-wrap">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setFilter(cat)}
                  className={cn("px-5 py-2 text-[11px] tracking-wider uppercase font-medium transition-all cursor-pointer",
                    filter === cat ? "bg-gold text-charcoal" : "border border-gold/10 text-cream/40 hover:text-gold hover:border-gold/30"
                  )}>{cat}</button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="gold-divider w-full" />

      {/* Products grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <FadeIn key={product.id} delay={i * 0.06}>
                <div className="group border border-gold/5 hover:border-gold/20 transition-all duration-500">
                  <div className="cursor-pointer" onClick={() => { setSelectedProduct(product); setSelectedVariant(product.variants?.[0] || ""); }}>
                    <ProductVisual product={product} />
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] tracking-wider uppercase text-cream/20 mb-1.5">{product.category}</p>
                    <h3 className="font-bold text-sm mb-2 group-hover:text-gold-light transition-colors">{product.name}</h3>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xl font-black gradient-text-gold">${product.price.toFixed(2)}</span>
                      <button onClick={() => addToCart(product, product.variants?.[0])}
                        className={cn("px-4 py-2 text-[10px] tracking-wider uppercase font-bold transition-all cursor-pointer",
                          addedId === product.id ? "bg-emerald-500 text-white" : "bg-gold text-charcoal hover:shadow-lg hover:shadow-gold/15"
                        )}>{addedId === product.id ? "Added!" : "Add to Cart"}</button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Product detail modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4 overflow-y-auto">
              <div className="relative w-full max-w-2xl bg-[#12100c] border border-gold/15">
                <button onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 z-10 h-8 w-8 flex items-center justify-center text-cream/30 hover:text-cream transition-colors cursor-pointer">
                  <X className="h-5 w-5" />
                </button>
                <div className="grid sm:grid-cols-2">
                  <ProductVisual product={selectedProduct} />
                  <div className="p-6 sm:p-8 flex flex-col">
                    <p className="text-[10px] tracking-wider uppercase text-cream/20 mb-2">{selectedProduct.category}</p>
                    <h3 className="text-xl font-black mb-3">{selectedProduct.name}</h3>
                    <p className="text-2xl font-black gradient-text-gold mb-4">${selectedProduct.price.toFixed(2)}</p>
                    <p className="text-sm text-cream/40 leading-relaxed mb-6 flex-1">{selectedProduct.description}</p>
                    {selectedProduct.variants && (
                      <div className="mb-6">
                        <p className="text-[10px] tracking-wider uppercase text-cream/30 mb-2">Size</p>
                        <div className="flex gap-2">
                          {selectedProduct.variants.map((v) => (
                            <button key={v} onClick={() => setSelectedVariant(v)}
                              className={cn("h-9 w-12 text-xs font-bold transition-all cursor-pointer",
                                selectedVariant === v ? "bg-gold text-charcoal" : "border border-gold/10 text-cream/40 hover:border-gold/30"
                              )}>{v}</button>
                          ))}
                        </div>
                      </div>
                    )}
                    <button onClick={() => { addToCart(selectedProduct, selectedVariant || undefined); setSelectedProduct(null); }}
                      className="w-full py-3.5 bg-gradient-to-r from-gold-light via-gold to-gold-dark text-charcoal font-bold text-[12px] tracking-wider uppercase hover:shadow-lg hover:shadow-gold/15 transition-all cursor-pointer flex items-center justify-center gap-2">
                      <ShoppingBag className="h-4 w-4" /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-md bg-[#12100c] border-l border-gold/10 flex flex-col">
              <div className="p-6 border-b border-gold/5 flex items-center justify-between">
                <h3 className="text-lg font-black flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-gold" /> Cart ({cartCount})
                </h3>
                <button onClick={() => setCartOpen(false)}
                  className="h-8 w-8 flex items-center justify-center text-cream/30 hover:text-cream transition-colors cursor-pointer">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16">
                    <ShoppingBag className="h-12 w-12 text-cream/10 mx-auto mb-4" />
                    <p className="text-cream/30">Your cart is empty</p>
                    <button onClick={() => setCartOpen(false)}
                      className="mt-4 text-gold text-sm hover:text-gold-light transition-colors cursor-pointer">
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  cart.map((item, i) => (
                    <div key={`${item.product.id}-${item.variant}`} className="flex gap-4 py-4 border-b border-gold/5">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden">
                        <ProductVisual product={item.product} size="sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm truncate">{item.product.name}</h4>
                        {item.variant && (
                          <p className="text-[10px] text-cream/25 tracking-wider uppercase mt-0.5">Size: {item.variant}</p>
                        )}
                        <p className="text-gold font-bold text-sm mt-1">${(item.product.price * item.quantity).toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQuantity(i, -1)}
                            className="h-7 w-7 border border-gold/10 flex items-center justify-center text-cream/40 hover:text-gold cursor-pointer">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(i, 1)}
                            className="h-7 w-7 border border-gold/10 flex items-center justify-center text-cream/40 hover:text-gold cursor-pointer">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-gold/5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-cream/40">Subtotal</span>
                    <span className="text-xl font-black gradient-text-gold">${cartTotal.toFixed(2)}</span>
                  </div>
                  <p className="text-[10px] text-cream/20 mb-4">Shipping calculated at checkout</p>
                  <button className="w-full py-4 bg-gradient-to-r from-gold-light via-gold to-gold-dark text-charcoal font-bold text-[12px] tracking-wider uppercase hover:shadow-lg hover:shadow-gold/15 transition-all cursor-pointer flex items-center justify-center gap-2">
                    <CreditCard className="h-4 w-4" /> Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
