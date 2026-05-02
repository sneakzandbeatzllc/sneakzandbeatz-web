import { getArticleIndex } from "@/lib/articles";

type TrendingItem = {
  title: string;
  url?: string;
  pillar?: string;
  articleSlug?: string;
};

/**
 * Ticker is S&B-NATIVE-ONLY. Every item links to either:
 *   1) /articles/{pillar}/{articleSlug} — our article
 *   2) /{pillar} — the pillar hub
 *
 * If ticker.json has no native items, fall back to the latest 8
 * articles from the article index. The bar ALWAYS shows something
 * unless we have literally zero articles.
 */
function resolveHref(item: TrendingItem): string | null {
  if (item.articleSlug && item.pillar) {
    return `/articles/${item.pillar}/${item.articleSlug}`;
  }
  if (item.pillar) {
    return `/${item.pillar}`;
  }
  return null;
}

export default function TrendingTicker({ items }: { items: TrendingItem[] }) {
  // First, try the SOC-engine ticker (filtered to internal-only)
  let native = items.filter((it) => resolveHref(it) !== null);

  // Fallback: if SOC ticker is empty, use the latest articles directly.
  // This guarantees the trending bar ALWAYS has content when we have
  // articles, regardless of whether the ticker.json was patched yet.
  if (native.length === 0) {
    try {
      const recent = getArticleIndex().slice(0, 10);
      native = recent.map((a) => ({
        title: a.headline,
        pillar: a.pillar,
        articleSlug: a.slug,
      }));
    } catch {
      // articleIndex fetch failed — keep native empty, bar will hide
    }
  }

  if (native.length === 0) {
    return null;
  }

  // Duplicate so the CSS keyframe ticker animation loops seamlessly.
  const looped = [...native, ...native];

  return (
    <section className="trending">
      <div className="container row">
        <span className="label">⚡ Trending Now</span>
        <div className="ticker">
          <div className="ticker-track">
            {looped.map((item, i) => {
              const href = resolveHref(item);
              if (!href) return null;
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
