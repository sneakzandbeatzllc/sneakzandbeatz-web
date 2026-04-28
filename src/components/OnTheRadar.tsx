/**
 * OnTheRadar.tsx
 *
 * Server component. Renders a horizontal grid of SOC cycles as
 * "topics PHRHX is considering for the next episode" — proof that the
 * show is plugged into culture in real-time, not a static episode list.
 *
 * Sourced from culture-mix.json (top cross-pillar items). Shows up to 6.
 * Auto-hides if SOC engine produced 0 items.
 */

import { fetchCultureMix } from "@/lib/soc-cycles";

const PILLAR_LABELS: Record<string, string> = {
  sneakers: "Sneakers",
  hiphop: "Hip-Hop",
  anime: "Anime",
  gaming: "Gaming",
};

export default async function OnTheRadar() {
  const items = (await fetchCultureMix()).slice(0, 6);

  if (items.length === 0) return null;

  return (
    <section className="container radar-section">
      <header className="radar-header">
        <span className="radar-eyebrow">⚡ On The Radar</span>
        <h2 className="radar-h2">Topics we&rsquo;re considering for the next episode</h2>
        <p className="radar-sub">
          Cherry-picked from what&rsquo;s actually moving across sneakers, hip-hop, anime,
          and gaming this week. Want to weigh in on which one we cover first? Drop a vote
          in <a href="/community">the Discord</a>.
        </p>
      </header>

      <div className="radar-grid">
        {items.map((it, i) => {
          const pillarLabel = it.pillar ? PILLAR_LABELS[it.pillar] || "Culture" : "Culture";
          return (
            <article key={i} className="radar-card">
              <div className="radar-card-meta">
                <span className="radar-card-pillar">{pillarLabel}</span>
                <span className="radar-card-score">SOC {it.score.toFixed(2)}</span>
              </div>
              <h3 className="radar-card-title">{it.title}</h3>
              {it.excerpt && <p className="radar-card-excerpt">{it.excerpt}</p>}
              <a
                href={it.url}
                target="_blank"
                rel="noopener"
                className="radar-card-link"
              >
                Read source ↗
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
