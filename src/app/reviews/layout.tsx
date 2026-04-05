import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Reviews — Bayo Entertainment",
  description:
    "Read what clients say about Bayo's saxophone performances. Real reviews from weddings, corporate events, and private celebrations.",
};

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
