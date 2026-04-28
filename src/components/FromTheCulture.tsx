import { fetchSubstackPosts, type SubstackPost } from "@/lib/substack";
import { fetchCultureMix, type PillarCycle } from "@/lib/soc-cycles";
import { SOCIAL } from "@/data/social";

const PILLAR_LABEL: Record<string, string> = {
  sneakers: "SNEAKERS",
  hiphop:   "HIP-HOP",
  anime:    "ANIME",
  gaming:   "GAMING",
};

/**
 * Homepage culture grid. Two-tier source strategy:
 *   1) Substack RSS — when posts exist, show those (primary)
 *   2) SOC engine culture-mix.json — cross-pillar fallback so the section
 *      never goes empty even on day 1
 */
export default async function FromTheCulture() {
  // Try Substack first.
  const posts = await fetchSubstackPosts(6);
  if (posts.length >= 4) return <SubstackGrid posts={posts} />;

  // Fall back to SOC engine cycles.
  const cycles = await fetchCultureMix();
  if (posts.length === 0 && cycles.length === 0) return null;

  // Mix both: Substack posts first (they're our own content, top of the
  // priority list), then engine cycles to fill out to 6.
  const merged = [
    ...posts.map(postToTile),
    ...cycles.map(cycleToTile).filter(
      (c) => !posts.some((p) => p.url === c.url)
    ),
  ].slice(0, 6);

  if (merged.length === 0) return null;

  return (
    <section className="culture container">
      <div className="culture-header">
        <h2>From The Culture</h2>
        <a
          href="https://sneakzandbeatz.substack.com"
          target="_blank"
          rel="noopener"
        >
          Read on Substack →
        </a>
      </div>
      <div className="culture-grid">
        {merged.map((t) => (
          <a
            key={t.url}
            className="culture-tile"
            href={t.url}
            target="_blank"
            rel="noopener"
          >
            {t.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={t.imageUrl} alt="" className="culture-tile-img" />
            ) : null}
            <div className="culture-tile-body">
              {t.pillar && (
                <span className="culture-tile-tag">{PILLAR_LABEL[t.pillar] || t.pillar.toUpperCase()}</span>
              )}
              <span className="culture-tile-title">{t.title}</span>
            </div>
          </a>
        ))}
      </div>
      <p className="culture-followline">
        Daily on Substack ·{" "}
        <a href={SOCIAL.instagram.url} target="_blank" rel="noopener">
          Follow on Instagram {SOCIAL.instagram.handle} →
        </a>
      </p>
    </section>
  );
}

type Tile = { url: string; title: string; pillar: string; imageUrl?: string };

function postToTile(p: SubstackPost): Tile {
  return {
    url: p.url,
    title: p.title,
    pillar: p.pillar || "",
    imageUrl: p.imageUrl,
  };
}

function cycleToTile(c: PillarCycle): Tile {
  return {
    url: c.url,
    title: c.title,
    pillar: c.pillar || "",
    imageUrl: undefined, // og:image extraction is a v2 — empty for now, gradient placeholder shows
  };
}

function SubstackGrid({ posts }: { posts: SubstackPost[] }) {
  return (
    <section className="culture container">
      <div className="culture-header">
        <h2>From The Culture</h2>
        <a
          href="https://sneakzandbeatz.substack.com"
          target="_blank"
          rel="noopener"
        >
          Read on Substack →
        </a>
      </div>
      <div className="culture-grid">
        {posts.map((p) => (
          <a
            key={p.url}
            className="culture-tile"
            href={p.url}
            target="_blank"
            rel="noopener"
          >
            {p.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.imageUrl} alt="" className="culture-tile-img" />
            ) : null}
            <div className="culture-tile-body">
              {p.pillar && (
                <span className="culture-tile-tag">{PILLAR_LABEL[p.pillar]}</span>
              )}
              <span className="culture-tile-title">{p.title}</span>
            </div>
          </a>
        ))}
      </div>
      <p className="culture-followline">
        Daily on Substack ·{" "}
        <a href={SOCIAL.instagram.url} target="_blank" rel="noopener">
          Follow on Instagram {SOCIAL.instagram.handle} →
        </a>
      </p>
    </section>
  );
}
