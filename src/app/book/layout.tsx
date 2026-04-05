import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Bayo — Schedule a Live Saxophone Performance",
  description:
    "Check availability and book Bayo for your next event. Weddings, corporate galas, concerts, private parties — worldwide.",
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
