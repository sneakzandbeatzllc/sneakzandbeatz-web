import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BEATS, getBeatBySlug } from "@/data/beats";

export function generateStaticParams() {
  return BEATS.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const beat = getBeatBySlug(params.slug);
  if (!beat) return { title: "Beat Not Found — Sneakz & Beatz" };
  return {
    title: `${beat.title} (${beat.bpm} BPM) — Sneakz & Beatz`,
    description: `${beat.categoryLabel} beat. ${beat.bpm ?? ""} BPM. Lease or download from Sneakz & Beatz.`,
  };
}

export default function BeatDetailPage({ params }: { params: { slug: string } }) {
  const beat = getBeatBySlug(params.slug);
  if (!beat) notFound();

  const related = BEATS.filter((b) => b.category === beat.category && b.slug !== beat.slug).slice(0, 4);

  return (
    <>
      <Header />

      <section className="container beat-detail-section">
        <Link href="/beats" className="btn-link">← Back to Beat Store</Link>

        <div className="beat-detail-grid">
          <div className="beat-detail-art" data-cat={beat.category}>
            <div className="beat-detail-art-inner">
              <span className="beat-detail-cat">{beat.categoryLabel}</span>
              <span className="beat-detail-bpm-big">{beat.bpm ?? "—"}</span>
              <span className="beat-detail-bpm-label">BPM</span>
            </div>
          </div>

          <div className="beat-detail-info">
            <span className="eyebrow">{beat.categoryLabel} · Beat</span>
            <h1 className="beat-detail-title">{beat.title}</h1>

            <div className="beat-detail-meta">
              {beat.bpm !== null && <span>{beat.bpm} BPM</span>}
              {beat.durationSec !== null && (
                <span>
                  {Math.floor(beat.durationSec / 60)}:
                  {String(Math.floor(beat.durationSec % 60)).padStart(2, "0")} length
                </span>
              )}
              <span>MP3 + WAV delivery</span>
            </div>

            <audio controls preload="none" src={beat.previewUrl} className="beat-detail-audio">
              Your browser does not support audio playback.
            </audio>

            {beat.isFree ? (
              <div className="beat-detail-buy">
                <div className="beat-detail-price">FREE</div>
                <p className="beat-detail-price-sub">
                  Free download with Substack signup. Voice-tag-free. Personal use only — for
                  commercial release, contact us.
                </p>
                <a
                  href="https://sneakzandbeatz.substack.com"
                  target="_blank"
                  rel="noopener"
                  className="btn btn-primary btn-arrow"
                >
                  Subscribe + Download
                </a>
              </div>
            ) : (
              <div className="beat-detail-buy">
                <div className="beat-detail-price">
                  <span className="beat-price-currency">$</span>
                  {beat.priceUSD.toFixed(2)}
                </div>
                <p className="beat-detail-price-sub">Lease license · MP3 + WAV · Up to 50,000 streams</p>
                {/*
                  Stripe Checkout integration goes here once the Stripe MCP is connected.
                  For now this routes to a mailto so you can manually invoice — swap to a
                  Stripe Checkout session URL when ready.
                */}
                <a
                  href={`mailto:blackroyalmusicmedia@gmail.com?subject=${encodeURIComponent(
                    `Beat Lease: ${beat.title} (${beat.bpm ?? "?"} BPM)`
                  )}&body=${encodeURIComponent(
                    `I'd like to lease "${beat.title}" — ${beat.categoryLabel} · ${beat.bpm ?? "?"} BPM · $${beat.priceUSD}.\n\nSend me payment instructions.`
                  )}`}
                  className="btn btn-primary btn-arrow"
                >
                  Lease For ${beat.priceUSD}
                </a>
                <details className="beat-detail-license">
                  <summary>What's included in a lease</summary>
                  <ul>
                    <li>MP3 + WAV files (high-quality master)</li>
                    <li>Up to 50,000 audio streams</li>
                    <li>Up to 2,500 physical/digital sales</li>
                    <li>1 music video</li>
                    <li>Non-profit performances + radio</li>
                    <li>Producer credit: "Prod. by Sneakz &amp; Beatz" required</li>
                    <li>For exclusive licensing or unlimited use, email us</li>
                  </ul>
                </details>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div className="beat-detail-related">
            <h2>More {beat.categoryLabel} Beats</h2>
            <div className="beat-detail-related-grid">
              {related.map((b) => (
                <Link key={b.slug} href={`/beats/${b.slug}`} className="beat-detail-related-card">
                  <div className="beat-detail-related-cat" data-cat={b.category}>{b.categoryLabel}</div>
                  <div className="beat-detail-related-title">{b.title}</div>
                  <div className="beat-detail-related-meta">
                    {b.bpm ? `${b.bpm} BPM` : ""}{b.bpm && !b.isFree ? " · " : ""}
                    {b.isFree ? "FREE" : `$${b.priceUSD.toFixed(2)}`}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
