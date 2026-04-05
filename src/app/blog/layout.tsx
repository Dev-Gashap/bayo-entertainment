import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Bayo Entertainment | News, Tours & Guides",
  description:
    "Tour announcements, behind-the-scenes stories, event planning guides, and press features from Bayo Entertainment.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
