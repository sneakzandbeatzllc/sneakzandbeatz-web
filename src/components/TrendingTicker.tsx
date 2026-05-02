type TrendingItem = {
  title: string;
  url?: string;        // External source URL (kept for ref but never linked to from ticker)
  pillar?: string;     // sneakers / hiphop / anime / gaming
  articleSlug?: string; // S&B article slug if we've covered this trend
};

/**
 * Ticker is S&B-NATIVE-ONLY.
 *
 * Every item must link to either:
 *   1) /articles/{pillar}/{articleSlug} — our own article (preferred)
 *   2) /{pillar} — the pillar hub page (queued, article in next cron run)
 *
 * NEVER an external URL. No more sending visitors away from the site
 * to GameStop/eBay/MTG news. If a ticker item can't resolve to one of
 * the above, it gets DROPPED entirely from the rendered ticker.
 */
function resolveHref(item: TrendingItem): string | null {
  if (item.articleSlug && item.pillar) {
    return `/articles/${item.pillar}/${item.articleSlug}`;
  }
  if (item.pillar) {
    return `/${item.pillar}`;
  }
  return null; // never fall through to external — drop instead
}

export default function TrendingTicker({ items }: { items: TrendingItem[] }) {
  // Filter: only items that resolve to an S&B-internal URL.
  const native = items.filter((it) => resolveHref(it) !== null);

  // If after filtering we have nothing, hide the bar entirely instead
  // of showing a half-empty version.
  if (native.length === 0) {
    return null;
  }

  // Duplicate the items so the CSS keyframe ticker animation loops seamlessly.
  const looped = [...native, ...native];

  return (
    <section className="trending">
      <div className="container row">
        <span className="label">⚡ Trending Now</span>
        <div className="ticker">
          <div className="ticker-track">
            {looped.map((item, i) => {
              const href = resolveHref(item);
              if (!href) return null; // belt-and-braces — never render external
              return (
                <a
                  key={`${item.title}-${i}`}
                  href={href}
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
