import { fetchFeaturedBeats } from "@/lib/beatstars";

export default async function BeatStore() {
  const beats = await fetchFeaturedBeats();

  return (
    <section className="beatstore container" id="beatstore">
      <div className="beatstore-header">
        <div>
          <span className="eyebrow">Beat Store · Powered by Beatstars</span>
          <h2>Need Beats For Your Next Drop?</h2>
          <p>
            Hard-hitting production for artists who move different. Lease, exclusive,
            and stem options.
          </p>
        </div>
        <a
          href="https://www.beatstars.com/sneakzbeatz"
          target="_blank"
          rel="noopener"
          className="btn btn-ghost btn-arrow"
        >
          Browse All Beats
        </a>
      </div>

      <div className="beatstore-grid">
        {beats.map((b) => (
          <div key={b.id} className="beat-card">
            <div className="beat-row">
              <button className="play-btn" aria-label={`Play ${b.name}`}>▶</button>
              <div className="waveform"></div>
            </div>
            <div>
              <div className="beat-name">{b.name}</div>
              <div className="beat-attrs">{b.bpm} BPM · {b.key} · {b.style}</div>
            </div>
            <div className="beat-cta-row">
              <div>
                <span className="beat-price">${b.priceUSD.toFixed(2)}</span>
                <div className="beatstars-tag">{b.licenseLabel}</div>
              </div>
              <button className="btn btn-ghost">Add 🛒</button>
            </div>
          </div>
        ))}

        {/*
          Bundle card → ClickFunnels page. Separate landing page for the
          high-conversion 100-Beats + Mix Pack offer. Keep this URL distinct
          from the main Beat Store catalog.
        */}
        <a
          href="https://beats.sneakzandbeatz.com/100-beats-mix-pack"
          target="_blank"
          rel="noopener"
          className="bundle-card"
        >
          <div>
            <span className="funnel-tag">↗ Funnel · ClickFunnels</span>
            <h3>Get 100 Beats<br />+ Mix Pack</h3>
          </div>
          <div>
            <p>Instant download. Trap, drill, R&amp;B, Detroit. Stems included.</p>
            <button
              className="btn"
              style={{ background: "black", color: "white", marginTop: "16px" }}
            >
              Unlock Now →
            </button>
          </div>
        </a>
      </div>
    </section>
  );
}
