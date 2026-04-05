import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spotlight — Bayo Entertainment | Live Performance Videos",
  description:
    "Watch Bayo in action. Live saxophone performances, concert highlights, and behind-the-scenes moments showcasing world-class musical artistry.",
};

export default function SpotlightLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
