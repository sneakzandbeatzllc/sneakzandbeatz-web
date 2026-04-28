/**
 * FeaturedStory.tsx
 *
 * Server component. Renders a single big "headline of the day" card sourced
 * from the highest-scoring SOC cycle across all pillars (culture-mix.json).
 *
 * Layout: 2-col on desktop (text left / accent block right), stacked on mobile.
 * Auto-hides if SOC engine produced no items above threshold today.
 */

import { fetchCultureMix } from "@/lib/soc-cycles";

const PILLAR_LABELS: Record<string, string> = {
  sneakers: "Sneakers",
  hiphop: "Hip-Hop",
  anime: "Anime",
  gaming: "Gaming",
};

export default async function FeaturedStory() {
  const items = await fetchCultureMix();
  const top = items[0];

  if (!top) return null;

  const pillarLabel = top.pillar ? PILLAR_LABELS[top.pillar] || "Culture" : "Culture";

  return (
    <section className="featured-story">
      <div className="container">
        <div className="featured-story-tag-row">
          <span className="featured-story-eyebrow">⚡ Featured · Today</span>
          <span className="featured-story-pillar">{pillarLabel}</span>
        </div>

        <div className="featured-story-grid">
          <div className="featured-story-text">
            <h2 className="featured-story-headline">{top.title}</h2>
            {top.excerpt && (
              <p className="featured-story-excerpt">{top.excerpt}</p>
            )}
            <div className="featured-story-cta-row">
              <a
                href={top.url}
                target="_blank"
                rel="noopener"
                className="btn btn-primary btn-arrow"
              >
                Read The Full Story
              </a>
              {top.platform && (
                <span className="featured-story-source">
                  via <strong>{top.platform}</strong>
                </span>
              )}
            </div>
          </div>

          <div className="featured-story-accent">
            <span className="featured-story-score">SOC {top.score.toFixed(2)}</span>
            <span className="featured-story-score-label">
              relevance score
              <br />
              across the four pillars
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
