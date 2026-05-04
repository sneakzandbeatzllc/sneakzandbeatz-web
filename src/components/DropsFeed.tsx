/**
 * DropsFeed.tsx
 *
 * Path A — replaces the AI article engine. This is a link-aggregation
 * feed (Drudge / HN / Reddit format): thumbnail + factual headline +
 * source attribution + outbound link. We do NOT reproduce content. Each
 * card sends the visitor to the original publisher.
 *
 * Sneakers leads (Jordan-first editorial rule). Then a mixed feed.
 *
 * Reads from /public/drops.json — built every 2 hours by
 * 07_AUTOMATION_OS/build_drops_feed.py.
 */

import fs from "node:fs";
import path from "node:path";

type Pillar = "sneakers" | "hiphop" | "anime" | "gaming";

interface Drop {
  id: string;
  pillar: Pillar;
  title: string;
  source: string;
  source_url: string;
  thumbnail: string | null;
  published: string;
  relative_time: string;
  score: number;
}

const PILLAR_LABELS: Record<Pillar, string> = {
  sneakers: "Sneakers",
  hiphop:   "Hip-Hop",
  anime:    "Anime",
  gaming:   "Gaming",
};

function loadDrops(): Drop[] {
  try {
    const file = path.join(process.cwd(), "public", "drops.json");
    if (!fs.existsSync(file)) return [];
    const raw = fs.readFileSync(file, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data?.items) ? (data.items as Drop[]) : [];
  } catch {
    return [];
  }
}

interface DropsFeedProps {
  /** Restrict to a single pillar (used on /sneakers, /hiphop etc) */
  pillar?: Pillar;
  /** Headline copy override */
  title?: string;
  /** Sub-copy override */
  subtitle?: string;
  /** Cap items shown (default: all) */
  limit?: number;
}

export default function DropsFeed({
  pillar,
  title = "What's dropping",
  subtitle = "The culture refresh — sneakers, music, anime, and gaming. Tap any card to read the source.",
  limit,
}: DropsFeedProps) {
  let items = loadDrops();
  if (pillar) items = items.filter((d) => d.pillar === pillar);
  if (limit)  items = items.slice(0, limit);

  if (items.length === 0) return null;

  return (
    <section className="drops-feed">
      <div className="container">
        <div className="drops-feed-head">
          <span className="eyebrow">Drops · Refresh · The Pulse</span>
          <h2 className="drops-feed-title">{title}</h2>
          <p className="drops-feed-sub">{subtitle}</p>
        </div>

        <div className="drops-feed-grid">
          {items.map((d) => (
            <a
              key={d.id}
              href={d.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`drop-card pillar-tint-${d.pillar}`}
            >
              <div className="drop-card-thumb">
                {d.thumbnail ? (
                  <img
                    src={d.thumbnail}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="drop-card-thumb-img"
                  />
                ) : (
                  <div className="drop-card-thumb-fallback">
                    <span className="drop-card-thumb-headline">{d.title}</span>
                  </div>
                )}
                <span className="drop-card-pillar">
                  {PILLAR_LABELS[d.pillar]}
                </span>
              </div>
              <div className="drop-card-body">
                <h3 className="drop-card-title">{d.title}</h3>
                <div className="drop-card-meta">
                  <span className="drop-card-source">{d.source}</span>
                  <span className="drop-card-dot">·</span>
                  <span className="drop-card-time">{d.relative_time}</span>
                  <span className="drop-card-arrow" aria-hidden="true">↗</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <p className="drops-feed-disclosure">
          Headlines and thumbnails link out to the original publishers.
          Sneakz &amp; Beatz aggregates the culture — we don&rsquo;t republish.
        </p>
      </div>
    </section>
  );
}
