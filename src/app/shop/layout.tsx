import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop — Bayo Entertainment | Merch, Music & Apparel",
  description:
    "Shop official Bayo Entertainment merchandise. Limited edition vinyl, apparel, digital downloads, and tour exclusives.",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
