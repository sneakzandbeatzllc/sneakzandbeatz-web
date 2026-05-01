type TrendingItem = {
  title: string;
  url?: string;        // External source URL (fallback)
  pillar?: string;     // sneakers / hiphop / anime / gaming
  articleSlug?: string; // S&B article slug if we've covered this trend
};

/**
 * Each trending item is a link.
 * Priority:
 *   1) /articles/{pillar}/{articleSlug} — our own article (best)
 *   2) /{pillar} — the pillar hub page (we have the topic queued)
 *   3) external source URL (last resort)
 */
function resolveHref(item: TrendingItem): string | null {
  if (item.articleSlug && item.pillar) {
    return `/articles/${item.pillar}/${item.articleSlug}`;
  }
  if (item.pillar) {
    return `/${item.pillar}`;
  }
  return item.url || null;
}

export default function TrendingTicker({ items }: { items: TrendingItem[] }) {
  // Duplicate the items so the CSS keyframe ticker animation loops seamlessly.
  const looped = [...items, ...items];

  return (
    <section className="trending">
      <div className="container row">
        <span className="label">⚡ Trending Now</span>
        <div className="ticker">
          <div className="ticker-track">
            {looped.map((item, i) => {
              const href = resolveHref(item);
              const content = (
                <>
                  <span className="dot"></span>
                  {item.title}
                </>
              );
              const isExternal = href && !href.startsWith("/");
              return href ? (
                <a
                  key={`${item.title}-${i}`}
                  href={href}
                  className="ticker-item-link"
                  {...(isExternal ? { target: "_blank", rel: "noopener" } : {})}
                >
                  {content}
                </a>
              ) : (
                <span key={`${item.title}-${i}`}>{content}</span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
