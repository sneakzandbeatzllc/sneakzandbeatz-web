import { fetchSubstackPosts, type SubstackPost } from "@/lib/substack";
import { SOCIAL } from "@/data/social";

const PILLAR_LABEL: Record<NonNullable<SubstackPost["pillar"]>, string> = {
  sneakers: "SNEAKERS",
  hiphop:   "HIP-HOP",
  anime:    "ANIME",
  gaming:   "GAMING",
};

/**
 * Homepage culture grid. Pulls 6 most-recent posts from the Substack RSS.
 * If the publication has 0 posts (early days), the section hides entirely
 * to avoid a wireframe-looking placeholder grid.
 */
export default async function FromTheCulture() {
  const posts = await fetchSubstackPosts(6);

  // Hide the section when there's nothing to show.
  if (posts.length === 0) return null;

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
