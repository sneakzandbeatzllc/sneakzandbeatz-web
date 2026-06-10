import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sneakz & Beatz — For Sneakerheads Who Live Hip-Hop, Anime & Gaming",
    template: "%s — Sneakz & Beatz",
  },
  description:
    "Sneakz & Beatz is the editorial home for sneakerheads who live hip-hop, anime, and gaming. Black-owned culture brand. Watch The PHRHX Show, get 100 mastered beats for $79, win $10K in the Rap Challenge.",
  metadataBase: new URL("https://www.sneakzandbeatz.com"),
  alternates: { canonical: "/" },
  keywords: [
    "Sneakz & Beatz",
    "PHRHX",
    "PHRHX Show",
    "Black sneakerhead",
    "Black-owned sneaker culture",
    "Black-owned hip-hop podcast",
    "Black nerd culture",
    "Blerd",
    "Air Jordan retro",
    "type beats for sale",
    "Rap Challenge",
    "Sneakz Pass",
    "sneakers hip-hop anime gaming",
  ],
  authors: [{ name: "PHRHX (Raymond Miller)", url: "https://www.sneakzandbeatz.com/about" }],
  creator: "PHRHX",
  publisher: "Sneakz & Beatz LLC",
  category: "Culture / Music / Sneakers",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: { url: "/logo-mark-256.png" },
  },
  openGraph: {
    title: "Sneakz & Beatz — For Sneakerheads Who Live Hip-Hop, Anime & Gaming",
    description:
      "Black-owned culture brand. The PHRHX Show, 100 mastered beats, the $79 Vault, the $10K Rap Challenge. Sneakers leads. Then hip-hop, anime, gaming.",
    url: "https://www.sneakzandbeatz.com",
    siteName: "Sneakz & Beatz",
    type: "website",
    locale: "en_US",
    // images intentionally omitted — file-based opengraph-image.tsx files
    // at the root and at every major route generate per-page OG images.
    // Setting layout-level images here would cascade down and override the
    // route-specific ones (Next.js shallow-merges openGraph; child must
    // explicitly set images to win, but file-based does NOT count as
    // "explicitly set" at the child level for the override behavior).
  },
  twitter: {
    card: "summary_large_image",
    site: "@sneakz_beatz",
    creator: "@sneakz_beatz",
    title: "Sneakz & Beatz",
    description:
      "For sneakerheads who live hip-hop, anime, and gaming. Black-owned culture brand. The PHRHX Show. 100 beats for $79. $10K Rap Challenge.",
    // images omitted — falls back to og:image automatically.
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    telephone: false,
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
