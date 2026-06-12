import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BeatCatalog from "@/components/BeatCatalog";
import { BEATS, CATEGORIES, getBeatsForDisplay } from "@/data/beats";
import { jsonLd, beatCatalogItemList } from "@/lib/schema";

export const metadata = {
  title: "Beat Store",
  description:
    "100 mastered beats across East Coast, West Coast, Trap, Rage, and Free. Producer-grade hip-hop for artists who move different.",
  alternates: { canonical: "/beats" },
  openGraph: {
    url: "https://www.sneakzandbeatz.com/beats",
    title: "Beat Store — Sneakz & Beatz",
    description:
      "100 mastered beats. East Coast, West Coast, Trap, Rage, Free. Lease, buy, or get the $79 Vault.",
    type: "website",
    // images intentionally omitted — file-based opengraph-image.tsx wins.
  },
};

export default function BeatsPage() {
  const totalCount = BEATS.length;
  const freeCount = BEATS.filter((b) => b.isFree).length;
  const paidCount = totalCount - freeCount;

  return (
    <>
      {/* JSON-LD: ItemList of MusicRecording / Offer per beat. AI engines
          and Google use this to surface the catalog in shopping/music
          rich results. Cap at 30 to keep payload reasonable. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          beatCatalogItemList(
            BEATS.map((b) => ({
              id: b.id,
              slug: b.slug,
              title: b.title,
              bpm: b.bpm ?? undefined,
              durationSec: b.durationSec ?? undefined,
              isFree: b.isFree,
              priceUsd: b.priceUSD,
              categoryLabel: b.categoryLabel,
            })),
            30,
          ),
        )}
      />
      <Header />

      <section className="zonehero">
        <div className="zonehero-bg" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/photos/sb-producer-monitors.jpg" alt="" loading="eager" />
        </div>
        <div className="container">
          <span className="eyebrow">
            The back room · Beat Lab · {totalCount} mastered beats · {paidCount} for lease · {freeCount} free
          </span>
          <h1 className="display zonehero-h1">
            The beat wall.
            <br />
            <em>take what fits.</em>
          </h1>
          <p className="zonehero-sub">
            Every beat on this wall came out of this room — produced, mixed, mastered in-house.
            Previews stream inline. Leases ship MP3 + WAV. Free beats unlock with a Substack
            signup.
          </p>
        </div>
      </section>

      {/* Bundle promo banner — sits between the hero and the catalog grid. */}
      <section className="container">
        <Link href="/beats/bundles" className="bundle-promo">
          <div className="bundle-promo-left">
            <span className="bundle-promo-tag">⚡ Bundle Drop · Limited</span>
            <h2 className="bundle-promo-h">
              Skip leasing one at a time. <span className="accent">All {totalCount} beats for $79.</span>
            </h2>
            <p className="bundle-promo-sub">
              Yes — every beat in the catalog, free ones included. That's
              <strong> ${(79 / totalCount).toFixed(2)} per beat</strong> with WAV + stems + drum
              kit + 6 months of future drops. Bundle license auto-delivered.
            </p>
          </div>
          <div className="bundle-promo-right">
            <div className="bundle-promo-anchor">
              Was <s>$2,500</s>
            </div>
            <div className="bundle-promo-price">
              <span className="bundle-promo-price-cur">$</span>79
            </div>
            <span className="btn btn-primary btn-arrow">See Bundles</span>
          </div>
        </Link>
      </section>

      <section className="container beat-store-section">
        <BeatCatalog beats={getBeatsForDisplay()} categories={CATEGORIES} />
      </section>

      <Footer />
    </>
  );
}
