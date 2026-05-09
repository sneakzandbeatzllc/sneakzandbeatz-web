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
  /** True when this slot is a coming-soon placeholder, not a real drop. */
  is_placeholder?: boolean;
  /** Release-window badge: "Drops This Week" / "Drops This Month" /
   *  "Drops Next Month" / "" — set by build_drops_feed when the
   *  article title carries an imminent release date. Renders as a
   *  small pill on the card so the upcoming heat is obvious. */
  release_badge?: string;
  /** Optional affiliate URL ("Cop" link). Populated by build_drops_feed.py
   *  once Impact.com (StockX), CJ Affiliate (Sweetwater), or Skimlinks
   *  (GOAT) credentials are wired up. When present, renders a small
   *  secondary CTA on the card so the visitor can buy without leaving
   *  the brand context. */
  affiliate_url?: string;
  /** Affiliate retailer name shown on the card ("StockX", "GOAT",
   *  "Sweetwater", "Amazon", etc.). */
  affiliate_label?: string;
}

const PILLAR_LABELS: Record<Pillar, string> = {
  sneakers: "Sneakers",
  hiphop:   "Hip-Hop",
  anime:    "Anime",
  gaming:   "Gaming",
};

interface DropsPayload {
  items: Drop[];
  /** Optional: explicit ID order for the homepage 6-card interleave. */
  homepage?: string[];
}

function loadDrops(): DropsPayload {
  try {
    const file = path.join(process.cwd(), "public", "drops.json");
    if (!fs.existsSync(file)) return { items: [] };
    const raw = fs.readFileSync(file, "utf-8");
    const data = JSON.parse(raw);
    return {
      items: Array.isArray(data?.items) ? (data.items as Drop[]) : [],
      homepage: Array.isArray(data?.homepage) ? (data.homepage as string[]) : undefined,
    };
  } catch {
    return { items: [] };
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
  const data = loadDrops();
  let items: Drop[];
  if (pillar) {
    // Pillar pages — filter the full items list to that pillar.
    items = data.items.filter((d) => d.pillar === pillar);
  } else if (data.homepage && data.homepage.length > 0) {
    // Homepage — explicit 6-card interleave order (sneakers slots 1/3/5,
    // hiphop slot 2, anime slot 4, gaming slot 6) per editorial rule.
    const byId = new Map(data.items.map((d) => [d.id, d]));
    items = data.homepage
      .map((id) => byId.get(id))
      .filter((d): d is Drop => Boolean(d));
  } else {
    items = data.items;
  }
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
          {items.map((d, idx) => (
            <a
              key={d.id}
              href={d.source_url}
              target={d.is_placeholder ? undefined : "_blank"}
              rel={d.is_placeholder ? undefined : "noopener noreferrer"}
              className={
                "drop-card pillar-tint-" + d.pillar +
                (d.is_placeholder ? " drop-card-placeholder" : "")
              }
            >
              <div className="drop-card-thumb">
                {d.release_badge && (
                  <span className="drop-card-release-badge">{d.release_badge}</span>
                )}
                {d.thumbnail ? (
                  <img
                    src={d.thumbnail}
                    // Descriptive alt = headline + pillar so screen readers
                    // and image-search bots both get useful context. Was
                    // alt="" which read as decorative — wrong, the imagery
                    // IS the story on a culture site.
                    alt={`${d.title} — ${PILLAR_LABELS[d.pillar]}`}
                    loading={idx < 6 ? "eager" : "lazy"}
                    fetchPriority={idx < 3 ? "high" : "auto"}
                    decoding="async"
                    className="drop-card-thumb-img"
                  />
                ) : (
                  <div className="drop-card-thumb-fallback">
                    <span className="drop-card-thumb-headline">
                      {d.is_placeholder
                        ? `New ${PILLAR_LABELS[d.pillar].toLowerCase()} drops coming`
                        : d.title}
                    </span>
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
                {/* Affiliate label — non-interactive on the card to keep
                    the card a clean single-link surface (server component).
                    TODO: Split DropsFeed into a Client Component wrapper so
                    this can become a real outbound affiliate link. For now
                    the badge surfaces the retailer; the user clicks the card
                    (which goes to the source publisher) and we'll redirect
                    to the affiliate URL via a /go/[id] route in a follow-up. */}
                {d.affiliate_url && d.affiliate_label && !d.is_placeholder && (
                  <span
                    className="drop-card-affiliate"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: "#FF6A1A",
                      marginTop: "6px",
                    }}
                  >
                    Cop on {d.affiliate_label} →
                  </span>
                )}
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
