import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instant Quote — Bayo Entertainment",
  description:
    "Get an instant AI-powered quote for booking Bayo at your event. Weddings, corporate galas, concerts, private parties.",
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
