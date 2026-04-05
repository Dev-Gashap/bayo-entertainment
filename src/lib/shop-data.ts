export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  imagePos: string;
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
    image: "/images/hero-stage.jpeg",
    imagePos: "center 20%",
    badge: "Limited Edition",
  },
  {
    id: "golden-hour-cd",
    name: "Golden Hour — CD",
    price: 14.99,
    description: "Standard CD edition of the Golden Hour album. 12 tracks of original saxophone compositions.",
    category: "Music",
    image: "/images/closeup.jpeg",
    imagePos: "center 25%",
  },
  {
    id: "bayo-signature-tee",
    name: "BAYO. Signature T-Shirt",
    price: 34.99,
    description: "Premium heavyweight cotton tee with embroidered BAYO. logo in metallic gold thread. Relaxed unisex fit.",
    category: "Apparel",
    image: "/images/backstage.jpeg",
    imagePos: "center 20%",
    variants: ["S", "M", "L", "XL", "2XL"],
  },
  {
    id: "neon-nights-hoodie",
    name: "Neon Nights Tour Hoodie",
    price: 59.99,
    description: "Oversized fleece hoodie with Neon Nights Tour 2026 artwork on the back. Embroidered saxophone silhouette on the chest.",
    category: "Apparel",
    image: "/images/hero-formal.jpeg",
    imagePos: "center 15%",
    badge: "Tour Exclusive",
    variants: ["S", "M", "L", "XL", "2XL"],
  },
  {
    id: "saxophone-sessions-digital",
    name: "Saxophone Sessions Vol. 1 — Digital",
    price: 9.99,
    description: "Digital download of 8 exclusive live saxophone recordings captured during private sessions. High-quality WAV + MP3 formats.",
    category: "Digital",
    image: "/images/lounge.jpeg",
    imagePos: "center 25%",
  },
  {
    id: "bayo-cap",
    name: "BAYO. Dad Cap",
    price: 29.99,
    description: "Structured cotton cap with BAYO. embroidered in metallic gold. Adjustable brass clasp closure.",
    category: "Apparel",
    image: "/images/hero-stage.jpeg",
    imagePos: "center 40%",
  },
];
