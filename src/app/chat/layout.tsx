import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat with Bayo's Team — Bayo Entertainment",
  description:
    "Chat directly with Bayo's booking team. Ask about availability, pricing, event details, or anything else. We respond fast.",
};

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
