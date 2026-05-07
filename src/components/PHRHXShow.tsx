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
import EpisodeCard from "@/components/EpisodeCard";

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
    title: "The New S&amp;B!",
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
    title: "Sneakz & Beatz Live Stream",
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
          {episodes.map((ep, i) => (
            <EpisodeCard
              key={ep.id}
              episode={ep}
              isFeatured={ep.isReal && i === 0}
              showLatestTag={ep.isReal && i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
