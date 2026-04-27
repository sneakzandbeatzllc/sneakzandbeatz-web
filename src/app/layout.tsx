import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sneakz & Beatz — Sneakers, Hip-Hop, Anime & Gaming Culture",
  description:
    "Stay ahead of the culture. Drops, beats, episodes, and the stories shaping sneaker, hip-hop, anime, and gaming culture — before everyone else catches on.",
  openGraph: {
    title: "Sneakz & Beatz — Where Sneakers, Hip-Hop, Anime & Gaming Collide.",
    description:
      "Culture-first editorial platform. Drops, beats, episodes, and the stories shaping the next era.",
    url: "https://sneakzandbeatz.com",
    siteName: "Sneakz & Beatz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sneakz & Beatz",
    description:
      "Where sneakers, hip-hop, anime & gaming collide. Drops, beats, episodes — before everyone else.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
