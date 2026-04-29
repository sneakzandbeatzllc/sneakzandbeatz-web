import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BeatCatalog from "@/components/BeatCatalog";
import { BEATS, CATEGORIES, getBeatsForDisplay } from "@/data/beats";

export const metadata = {
  title: "Beat Store — Sneakz & Beatz",
  description:
    "96 mastered beats across East Coast, West Coast, Trap, Rage, and Free. Hard-hitting production for artists who move different.",
};

export default function BeatsPage() {
  const totalCount = BEATS.length;
  const freeCount = BEATS.filter((b) => b.isFree).length;
  const paidCount = totalCount - freeCount;

  return (
    <>
      <Header />

      <section className="beat-store-hero">
        <div className="container">
          <span className="eyebrow">
            Beat Store · {totalCount} mastered beats · {paidCount} for lease · {freeCount} free
          </span>
          <h1 className="beat-store-title">
            Beats For
            <br />
            Artists Who
            <br />
            <span className="accent">Move Different.</span>
          </h1>
          <p className="lead beat-store-lead">
            All beats below are produced by Sneakz &amp; Beatz / BRMG. 60-second previews stream
            inline. Lease beats are MP3 + WAV delivery. Free beats unlock with a Substack signup.
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
