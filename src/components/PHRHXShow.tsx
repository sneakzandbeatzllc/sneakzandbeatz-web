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

// Hardcoded fallback to REAL channel videos. If the YouTube RSS fetch
// fails (Vercel IPs blocked, ISR cache stale, etc.) we still render
// real thumbnails + real titles + real video links instead of generic
// "Subscribe on YouTube" placeholders. Update these IDs every time
// you publish a notable new episode — the dynamic fetch will normally
// override them, this is purely defensive.
const FALLBACK_EPISODES: Episode[] = [
  {
    id: "2SBnn0bY2xY",
    title: "The New BRMG!",
    href: "https://www.youtube.com/watch?v=2SBnn0bY2xY",
    thumbnail: "https://i.ytimg.com/vi/2SBnn0bY2xY/hqdefault.jpg",
    publishedLabel: "",
    isReal: true,
  },
  {
    id: "MpvEDKUeNes",
    title: "Rap's BIGGEST Flop Stars of 2025!",
    href: "https://www.youtube.com/watch?v=MpvEDKUeNes",
    thumbnail: "https://i.ytimg.com/vi/MpvEDKUeNes/hqdefault.jpg",
    publishedLabel: "",
    isReal: true,
  },
  {
    id: "YamAo3IAhao",
    title: "Black Royal MG Live Stream",
    href: "https://www.youtube.com/watch?v=YamAo3IAhao",
    thumbnail: "https://i.ytimg.com/vi/YamAo3IAhao/hqdefault.jpg",
    publishedLabel: "",
    isReal: true,
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
                    {/* Real <img> so mobile Safari + Chrome render reliably.
                        All three are eager-loaded — there are only three
                        thumbnails on the homepage so the bandwidth cost is
                        trivial, and lazy-loading on iOS was causing the
                        parent .episode to collapse before the image arrived. */}
                    <img
                      src={ep.thumbnail}
                      alt=""
                      loading="eager"
                      decoding="async"
                      width="480"
                      height="270"
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
