import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sneakz & Beatz — Sneakers, Hip-Hop, Anime & Gaming Culture",
  description:
    "Stay ahead of the culture. Drops, beats, episodes, and the stories shaping sneaker, hip-hop, anime, and gaming culture — before everyone else catches on.",
  metadataBase: new URL("https://sneakzandbeatz.com"),
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: { url: "/logo-mark-256.png" },
  },
  openGraph: {
    title: "Sneakz & Beatz — Where Sneakers, Hip-Hop, Anime & Gaming Collide.",
    description:
      "Culture-first editorial platform. Drops, beats, episodes, and the stories shaping the next era.",
    url: "https://sneakzandbeatz.com",
    siteName: "Sneakz & Beatz",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sneakz & Beatz — Where sneakers, hip-hop, anime & gaming collide.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sneakz & Beatz",
    description:
      "Where sneakers, hip-hop, anime & gaming collide. Drops, beats, episodes — before everyone else.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <CookieBanner />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
