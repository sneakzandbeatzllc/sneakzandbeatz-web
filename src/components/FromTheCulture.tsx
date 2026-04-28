import { fetchRecentInstagramMedia } from "@/lib/instagram";
import { SOCIAL } from "@/data/social";

const TILE_LABELS = ["Sneakers", "Hip-Hop", "Anime", "Gaming", "The Show", "Crowd"];

export default async function FromTheCulture() {
  const media = await fetchRecentInstagramMedia({ limit: 6 });

  return (
    <section className="culture container">
      <div className="culture-header">
        <h2>From The Culture</h2>
        <a href={SOCIAL.instagram.url} target="_blank" rel="noopener">
          Follow on Instagram {SOCIAL.instagram.handle} →
        </a>
      </div>
      <div className="culture-grid">
        {media.length > 0
          ? media.map((m) => (
              <a key={m.id} className="culture-tile" href={m.permalink} target="_blank" rel="noopener">
                <span>{m.caption ? m.caption.slice(0, 24) : "Post"}</span>
                {/*
                  When wired to real IG Graph API, replace this <span> with:
                  <Image src={m.mediaUrl} alt={m.caption} fill style={{objectFit: "cover"}} />
                  and add cdninstagram.com hosts to next.config.mjs (already done).
                */}
              </a>
            ))
          : TILE_LABELS.map((label) => (
              <a key={label} className="culture-tile" href="#">
                <span>{label}</span>
              </a>
            ))}
      </div>
    </section>
  );
}
