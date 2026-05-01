/**
 * PHRHXShow.tsx
 *
 * Homepage section. Pulls the latest 3 videos from the The PHRHX Show
 * YouTube channel via RSS. Renders thumbnail + play overlay; clicking
 * opens the YouTube watch page in a new tab.
 *
 * Fallback: if the YouTube fetch fails or returns 0 videos, renders 3
 * branded placeholder cards (each linking to the YouTube channel) so
 * the homepage never ships with bare empty cards.
 *
 * Fetches 3 (not 4) so it fits cleanly in the 3-column auto-fit grid
 * without orphan-wrapping the 4th card to a new row.
 */

import Link from "next/link";
import { fetchYouTubeVideos, formatPublishedAgo, type YouTubeVideo } from "@/lib/youtube";
import { SOCIAL } from "@/data/social";

type Episode = {
  id: string;
  title: string;
  href: string;
  thumbnail?: string;
  publishedLabel?: string;
  isReal: boolean;
};

const FALLBACK_EPISODES: Episode[] = [
  {
    id: "fb-1",
    title: "New episodes weekly — sneakers, hip-hop, anime, gaming",
    href: SOCIAL.youtube.url,
    isReal: false,
  },
  {
    id: "fb-2",
    title: "Long-form interviews + cultural breakdowns",
    href: SOCIAL.youtube.url,
    isReal: false,
  },
  {
    id: "fb-3",
    title: "Subscribe on YouTube — first to know on every drop",
    href: SOCIAL.youtube.url,
    isReal: false,
  },
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
  const videos = await fetchYouTubeVideos(undefined, 3);
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
            const target = "_blank";
            const rel = "noopener";

            return (
              <a
                key={ep.id}
                href={ep.href}
                target={target}
                rel={rel}
                className={"episode" + (ep.isReal && i === 0 ? " featured" : "")}
              >
                {ep.thumbnail ? (
                  <div className="thumb thumb-image">
                    {/* Use a real <img> so mobile Safari + Chrome render the
                        thumbnail reliably. Inline-style background-image was
                        rendering blank on some iOS viewports. */}
                    <img
                      src={ep.thumbnail}
                      alt=""
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="thumb-img"
                    />
                  </div>
                ) : (
                  <div className="thumb"></div>
                )}
                {ep.isReal && i === 0 && (
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
