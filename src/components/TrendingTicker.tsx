import fs from "node:fs";
import path from "node:path";

type TrendingItem = {
  title: string;
  url?: string;
  pillar?: string;
};

/**
 * Trending ticker — Path A version.
 *
 * Reads drops.json directly (server component). Each item's href is the
 * source publisher URL (Sneakerfiles, SBD, Polygon, etc.) — same as the
 * DropsFeed cards.
 *
 * NO fallback to the articles index. The articles index still contains
 * old AI-generated articles which we don't want to surface anymore. If
 * drops.json is somehow missing or empty, the ticker just hides.
 *
 * The `items` prop is accepted for backward compat but ignored — kept
 * so we don't have to touch page.tsx during this swap.
 */
function loadTickerItems(): TrendingItem[] {
  try {
    const file = path.join(process.cwd(), "public", "drops.json");
    if (!fs.existsSync(file)) return [];
    const raw = fs.readFileSync(file, "utf-8");
    const data = JSON.parse(raw);
    const items = Array.isArray(data?.items) ? data.items : [];
    return items
      .filter((d: any) => d && d.title && d.source_url)
      .map((d: any) => ({
        title: d.title as string,
        url: d.source_url as string,
        pillar: d.pillar as string,
      }));
  } catch {
    return [];
  }
}

// Cap the ticker at this many unique items. Looped ×2 for the CSS scroll, so
// the rendered DOM is 2× this. Keeping it at 12 means ≤24 anchors in the
// homepage HTML — small enough that the ticker doesn't dominate page weight.
// Drops feed below the fold still shows the rest of today's culture refresh.
const TICKER_MAX_ITEMS = 12;

export default function TrendingTicker(_props?: { items?: unknown }) {
  const allItems = loadTickerItems();
  if (allItems.length === 0) return null;

  // Cap to the freshest N items. Adding a "View all" CTA at the end of the
  // looped track gives users a path to the full pillar feeds.
  const native = allItems.slice(0, TICKER_MAX_ITEMS);

  // Duplicate so the CSS keyframe ticker animation loops seamlessly.
  const looped = [...native, ...native];

  // Scale the scroll duration to item count so the per-pixel speed stays
  // readable (~90 px/sec) regardless of how many items end up showing.
  // Roughly 7s per item; floor at 90s, cap at 240s.
  const durationSec = Math.min(240, Math.max(90, native.length * 7));

  return (
    <section className="trending">
      <div className="container row">
        <span className="label">⚡ Trending Now</span>
        <div className="ticker">
          <div
            className="ticker-track"
            style={{ "--ticker-duration": `${durationSec}s` } as React.CSSProperties}
          >
            {looped.map((item, i) => {
              if (!item.url) return null;
              return (
                <a
                  key={`${item.title}-${i}`}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ticker-item-link"
                >
                  <span className="dot"></span>
                  {item.title}
                </a>
              );
            })}
            {/* View-all CTA at the end of each loop — gives the user a path
                from the ticker into the deeper pillar feeds without making
                the ticker itself the only on-ramp. */}
            <a
              key="view-all-1"
              href="/sneakers"
              className="ticker-item-link"
              style={{ fontWeight: 700 }}
            >
              <span className="dot"></span>
              View all drops →
            </a>
            <a
              key="view-all-2"
              href="/sneakers"
              className="ticker-item-link"
              style={{ fontWeight: 700 }}
            >
              <span className="dot"></span>
              View all drops →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
