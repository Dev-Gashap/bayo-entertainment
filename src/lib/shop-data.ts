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
    name: "Golden Hour \u2014 Limited Edition Vinyl",
    price: 39.99,
    description: "180g audiophile vinyl with gold-foil embossed cover. Includes exclusive liner notes and a download card for bonus tracks. Limited to 500 copies.",
    category: "Music",
    image: "/images/products/vinyl.jpg",
    imagePos: "center center",
    badge: "Limited Edition",
  },
  {
    id: "golden-hour-cd",
    name: "Golden Hour \u2014 CD + Album Art",
    price: 14.99,
    description: "Standard CD edition of the Golden Hour album with collectible album art sleeve. 12 tracks of original saxophone compositions.",
    category: "Music",
    image: "/images/products/cd.jpg",
    imagePos: "center center",
  },
  {
    id: "bayo-signature-tee",
    name: "BAYO. Signature T-Shirt",
    price: 34.99,
    description: "Premium heavyweight cotton tee with embroidered BAYO. logo in metallic gold thread. Clean white, relaxed unisex fit.",
    category: "Apparel",
    image: "/images/products/tshirt.jpg",
    imagePos: "center 30%",
    variants: ["S", "M", "L", "XL", "2XL"],
  },
  {
    id: "neon-nights-hoodie",
    name: "Neon Nights Tour Hoodie",
    price: 59.99,
    description: "Oversized fleece hoodie with BAYO. Neon Nights Tour 2026 artwork on the back. Embroidered saxophone silhouette on the chest. Premium quality.",
    category: "Apparel",
    image: "/images/products/hoodie.jpg",
    imagePos: "center 20%",
    badge: "Tour Exclusive",
    variants: ["S", "M", "L", "XL", "2XL"],
  },
  {
    id: "bayo-cap",
    name: "BAYO. Dad Cap",
    price: 29.99,
    description: "Washed cotton dad cap with BAYO. embroidered in metallic gold thread. Adjustable brass clasp closure. One size fits all.",
    category: "Apparel",
    image: "/images/products/cap.jpg",
    imagePos: "center center",
  },
  {
    id: "bayo-coffee-mug",
    name: "BAYO. Ceramic Coffee Mug",
    price: 19.99,
    description: "12oz matte black ceramic mug with BAYO. logo and saxophone silhouette in metallic gold. Dishwasher and microwave safe. Start your mornings with excellence.",
    category: "Drinkware",
    image: "/images/products/mug.jpg",
    imagePos: "center center",
    badge: "New",
  },
  {
    id: "bayo-latte-set",
    name: "BAYO. Latte Cup Set",
    price: 34.99,
    description: "Set of 2 premium ceramic latte cups with BAYO. gold branding. Perfect for coffee lovers and saxophone enthusiasts. Comes in a branded gift box.",
    category: "Drinkware",
    image: "/images/products/coffee-mug.jpg",
    imagePos: "center center",
  },
  {
    id: "bayo-tumbler",
    name: "BAYO. Insulated Tumbler",
    price: 27.99,
    description: "17oz double-wall vacuum insulated stainless steel tumbler with BAYO. logo engraved in gold. Keeps drinks hot 12hrs, cold 24hrs. Leak-proof lid.",
    category: "Drinkware",
    image: "/images/products/tumbler.jpg",
    imagePos: "center center",
    badge: "New",
  },
];
