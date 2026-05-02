/**
 * LatestArticles.tsx
 *
 * Server component. Pulls the 4 most recent AI-generated articles from
 * the articles-index and renders them as visual cards with the hero
 * image, headline, subhead, and pillar pill. Placed near the top of the
 * homepage so users see fresh editorial content before the static "What
 * We Cover" pillar grid — drives time-on-site by giving them something
 * to actually click into immediately.
 *
 * Auto-hides if no articles exist yet.
 */

import Link from "next/link";
import { getArticleIndex, formatPublished, type PillarKey } from "@/lib/articles";

const PILLAR_LABELS: Record<PillarKey, string> = {
  sneakers: "Sneakers",
  hiphop: "Hip-Hop",
  anime: "Anime",
  gaming: "Gaming",
};

const HOW_MANY = 4;

export default function LatestArticles() {
  const items = getArticleIndex().slice(0, HOW_MANY);
  if (items.length === 0) return null;

  const featured = items[0];
  const rest = items.slice(1);

  return (
    <section className="latest-articles">
      <div className="container">
        <div className="latest-articles-head">
          <span className="eyebrow">Latest from the Culture</span>
          <h2 className="latest-articles-title">Read up. Catch up. Stay locked in.</h2>
          <p className="latest-articles-sub">
            Fresh editorial across sneakers, hip-hop, anime, and gaming —
            published daily, written for the audience that lives it.
          </p>
        </div>

        <div className="latest-articles-grid">
          {/* Featured (big) card — top story */}
          <Link
            href={`/articles/${featured.pillar}/${featured.slug}`}
            className="latest-card latest-card-featured"
          >
            <div className={`latest-card-thumb pillar-tint-${featured.pillar}`}>
              {featured.heroImage ? (
                <img
                  src={featured.heroImage}
                  alt=""
                  loading="eager"
                  decoding="async"
                  className="latest-card-thumb-img"
                />
              ) : (
                <div className="latest-card-thumb-fallback">
                  <span className="latest-card-thumb-headline">
                    {featured.headline}
                  </span>
                  <span className="latest-card-thumb-image-pending">
                    AI hero image pending
                  </span>
                </div>
              )}
              <span className="latest-card-pillar">
                {PILLAR_LABELS[featured.pillar]}
              </span>
            </div>
            <div className="latest-card-body">
              <span className="latest-card-date">
                {formatPublished(featured.publishedAt)}
              </span>
              <h3 className="latest-card-headline">{featured.headline}</h3>
              <p className="latest-card-subhead">{featured.subhead}</p>
              <span className="latest-card-cta">Read the full breakdown →</span>
            </div>
          </Link>

          {/* Smaller stacked cards on the right */}
          <div className="latest-articles-side">
            {rest.map((it, idx) => (
              <Link
                key={`${it.pillar}-${it.slug}`}
                href={`/articles/${it.pillar}/${it.slug}`}
                className="latest-card latest-card-small"
              >
                <div className={`latest-card-thumb-small pillar-tint-${it.pillar}`}>
                  {it.heroImage ? (
                    <img
                      src={it.heroImage}
                      alt=""
                      // All 3 sidecars are above the fold on desktop. Lazy-loading
                      // them caused the audit's "black thumb on first paint" bug.
                      loading={idx < 2 ? "eager" : "lazy"}
                      fetchPriority={idx === 0 ? "high" : "auto"}
                      decoding="async"
                      className="latest-card-thumb-img"
                    />
                  ) : (
                    <div className="latest-card-thumb-fallback">
                      <span className="latest-card-thumb-headline-small">
                        {it.headline}
                      </span>
                    </div>
                  )}
                </div>
                <div className="latest-card-body-small">
                  <span className="latest-card-pillar latest-card-pillar-small">
                    {PILLAR_LABELS[it.pillar]}
                  </span>
                  <h4 className="latest-card-headline-small">{it.headline}</h4>
                  <span className="latest-card-date latest-card-date-small">
                    {formatPublished(it.publishedAt)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
