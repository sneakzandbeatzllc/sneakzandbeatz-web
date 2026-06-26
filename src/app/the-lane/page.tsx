import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LaneGrid from "@/components/LaneGrid";

export const metadata = {
  title: {
    absolute: "The Lane — Sneakz & Beatz",
  },
  description:
    "Every story Sneakz & Beatz is telling — sneakers, hip-hop, anime, and gaming — newest and hottest first.",
  alternates: {
    canonical: "/the-lane",
    types: {
      "application/rss+xml": [
        { url: "/the-lane/feed.xml", title: "The Lane — Sneakz & Beatz" },
      ],
    },
  },
  openGraph: {
    title: "The Lane — Sneakz & Beatz",
    description:
      "Sneakers, hip-hop, anime, and gaming — the Black-owned culture brand's editorial, ranked by what's trending.",
    url: "https://www.sneakzandbeatz.com/the-lane",
    siteName: "Sneakz & Beatz",
    type: "website",
  },
};

export default function TheLanePage() {
  return (
    <>
      <Header />
      <main className="container the-lane">
        <header className="legal-hero" style={{ paddingBottom: 8 }}>
          <span className="eyebrow">The Lane · Editorial</span>
          <h1 className="legal-title">The Lane</h1>
          <p className="lead legal-lead">
            Sneakers, hip-hop, anime, gaming — every story we&rsquo;re telling,
            ranked by what&rsquo;s trending right now.
          </p>
        </header>
      </main>

      {/* The whole page is the article grid — trend-ranked, hero images. */}
      <LaneGrid />

      <Footer />
    </>
  );
}
