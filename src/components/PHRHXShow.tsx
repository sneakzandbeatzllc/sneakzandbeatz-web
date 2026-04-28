/**
 * PHRHXShow.tsx
 *
 * Homepage section. Pulls the latest 4 videos directly from the
 * The PHRHX Show YouTube channel via RSS. Renders thumbnail + play
 * overlay; clicking opens the YouTube watch page in a new tab.
 *
 * If the YouTube fetch fails (network, blocked) or returns 0 videos, the
 * component falls back to a small set of hardcoded teaser cards so the
 * homepage doesn't ship empty.
 */

import Link from "next/link";
import { fetchYouTubeVideos, formatPublishedAgo, type YouTubeVideo } from "@/lib/youtube";

type Episode = {
  id: string;
  title: string;
  href: string;
  thumbnail?: string;
  publishedLabel?: string;
  isReal: boolean;
};

const FALLBACK_EPISODES: Episode[] = [
  { id: "fb-1", title: "The PHRHX Show — new episodes weekly",  href: "/show", isReal: false },
  { id: "fb-2", title: "Subscribe on YouTube",                  href: "/show", isReal: false },
  { id: "fb-3", title: "Sneakers · Hip-Hop · Anime · Gaming",  href: "/show", isReal: false },
  { id: "fb-4", title: "Long-form interviews + breakdowns",    href: "/show", isReal: false },
];

function videoToEpisode(v: YouTubeVideo): Episode {
  return {
    id: v.id,
    title: v.title,
    href: v.url,
    thumbnail: v.thumbnail,
    publishedLabel: formatPublishedAgo(v.publishedAt),
    isReal: true,
  };
}

export default async function PHRHXShow() {
  const videos = await fetchYouTubeVideos(undefined, 4);
  const episodes: Episode[] =
    videos.length > 0 ? videos.map(videoToEpisode) : FALLBACK_EPISODES;

  return (
    <section className="show-section" id="show">
      <div className="container show-grid">
        <div>
          <span className="eyebrow">The PHRHX Show</span>
          <h2>Real Conversations. Zero Filter.</h2>
          <p className="show-meta">
            Long-form episodes across sneakers, hip-hop, anime, and gaming.
            New uploads land here automatically — pulled live from the YouTube channel.
          </p>
          <Link href="/show" className="btn btn-ghost btn-arrow">
            Watch All Episodes
          </Link>
          <div className="show-platforms">
            <span className="pill">YouTube</span>
            <span className="pill">Spotify</span>
            <span className="pill">Apple Podcasts</span>
            <span className="pill">RSS</span>
          </div>
        </div>
        <div className="episodes">
          {episodes.map((ep, i) => {
            const isFeatured = i === 0;
            const target = ep.isReal ? "_blank" : undefined;
            const rel = ep.isReal ? "noopener" : undefined;

            return (
              <a
                key={ep.id}
                href={ep.href}
                target={target}
                rel={rel}
                className={`episode${isFeatured ? " featured" : ""}`}
              >
                {ep.thumbnail ? (
                  <div
                    className="thumb thumb-image"
                    style={{ backgroundImage: `url(${ep.thumbnail})` }}
                  />
                ) : (
                  <div className="thumb"></div>
                )}
                {isFeatured && ep.isReal && (
                  <span className="latest-tag">Latest</span>
                )}
                <div className="play">
                  <div className="play-icon">▶</div>
                </div>
                <div className="meta">
                  <div>
                    {ep.publishedLabel && (
                      <span className="ep-num">{ep.publishedLabel}</span>
                    )}
                    <h4>{ep.title}</h4>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
