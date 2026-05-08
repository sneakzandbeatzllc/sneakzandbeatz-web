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

export default function TrendingTicker(_props?: { items?: unknown }) {
  const native = loadTickerItems();
  if (native.length === 0) return null;

  // Duplicate so the CSS keyframe ticker animation loops seamlessly.
  const looped = [...native, ...native];

  // Scale the scroll duration to item count so the per-pixel speed stays
  // readable (~90 px/sec) regardless of how many drops we have on a given
  // day. Roughly 7s per item; floor at 120s, cap at 600s.
  const durationSec = Math.min(600, Math.max(120, native.length * 7));

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
          </div>
        </div>
      </div>
    </section>
  );
}
