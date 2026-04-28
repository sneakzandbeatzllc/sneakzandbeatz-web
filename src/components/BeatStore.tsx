import Link from "next/link";
import { fetchFeaturedBeats } from "@/lib/beatstars";

export default async function BeatStore() {
  const beats = await fetchFeaturedBeats();

  return (
    <section className="beatstore container" id="beatstore">
      <div className="beatstore-header">
        <div>
          <span className="eyebrow">Beat Store · Powered by Black Royal Music Media</span>
          <h2>Need Beats For Your Next Drop?</h2>
          <p>
            Hard-hitting production for artists who move different. Lease, exclusive,
            and stem options.
          </p>
        </div>
        <Link href="/beats" className="btn btn-ghost btn-arrow">
          Browse All Beats
        </Link>
      </div>

      <div className="beatstore-grid">
        {beats.map((b) => (
          <Link key={b.id} href={b.buyUrl ?? "/beats"} className="beat-card">
            <div className="beat-row">
              <button className="play-btn" aria-label={`Play ${b.name}`}>▶</button>
              <div className="waveform"></div>
            </div>
            <div>
              <div className="beat-name">{b.name}</div>
              <div className="beat-attrs">
                {b.bpm > 0 ? `${b.bpm} BPM · ` : ""}{b.style}
              </div>
            </div>
            <div className="beat-cta-row">
              <div>
                <span className="beat-price">${b.priceUSD.toFixed(2)}</span>
                <div className="beatstars-tag">{b.licenseLabel}</div>
              </div>
              <span className="btn btn-ghost">Lease →</span>
            </div>
          </Link>
        ))}

        {/* Bundle promo card → /beats/bundles (3-tier funnel built on-site). */}
        <Link href="/beats/bundles" className="bundle-card">
          <div>
            <span className="funnel-tag">↗ Bundle · Save 99%</span>
            <h3>Get 100 Beats<br />+ Mix Pack</h3>
          </div>
          <div>
            <p>Instant download. Trap, East Coast, West Coast, Rage. Stems included.</p>
            <button
              className="btn"
              style={{ background: "black", color: "white", marginTop: "16px" }}
            >
              See Bundles →
            </button>
          </div>
        </Link>
      </div>
    </section>
  );
}
