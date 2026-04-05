export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  icon: string;
  gradient: string;
  badge?: string;
  variants?: string[];
}

export const products: Product[] = [
  {
    id: "golden-hour-vinyl",
    name: "Golden Hour — Limited Edition Vinyl",
    price: 39.99,
    description: "180g audiophile vinyl with gold-foil embossed cover. Includes exclusive liner notes and a download card for bonus tracks. Limited to 500 copies.",
    category: "Music",
    icon: "vinyl",
    gradient: "from-amber-900 via-yellow-800 to-amber-950",
    badge: "Limited Edition",
  },
  {
    id: "golden-hour-cd",
    name: "Golden Hour — CD",
    price: 14.99,
    description: "Standard CD edition of the Golden Hour album. 12 tracks of original saxophone compositions.",
    category: "Music",
    icon: "cd",
    gradient: "from-zinc-800 via-zinc-700 to-zinc-900",
  },
  {
    id: "bayo-signature-tee",
    name: "BAYO. Signature T-Shirt",
    price: 34.99,
    description: "Premium heavyweight cotton tee with embroidered BAYO. logo in metallic gold thread. Relaxed unisex fit.",
    category: "Apparel",
    icon: "tshirt",
    gradient: "from-stone-900 via-stone-800 to-stone-950",
    variants: ["S", "M", "L", "XL", "2XL"],
  },
  {
    id: "neon-nights-hoodie",
    name: "Neon Nights Tour Hoodie",
    price: 59.99,
    description: "Oversized fleece hoodie with Neon Nights Tour 2026 artwork on the back. Embroidered saxophone silhouette on the chest.",
    category: "Apparel",
    icon: "hoodie",
    gradient: "from-purple-950 via-purple-900 to-indigo-950",
    badge: "Tour Exclusive",
    variants: ["S", "M", "L", "XL", "2XL"],
  },
  {
    id: "saxophone-sessions-digital",
    name: "Saxophone Sessions Vol. 1 — Digital",
    price: 9.99,
    description: "Digital download of 8 exclusive live saxophone recordings captured during private sessions. High-quality WAV + MP3 formats.",
    category: "Digital",
    icon: "download",
    gradient: "from-blue-950 via-blue-900 to-cyan-950",
  },
  {
    id: "bayo-cap",
    name: "BAYO. Dad Cap",
    price: 29.99,
    description: "Structured cotton cap with BAYO. embroidered in metallic gold. Adjustable brass clasp closure.",
    category: "Apparel",
    icon: "cap",
    gradient: "from-neutral-900 via-neutral-800 to-neutral-950",
  },
];
