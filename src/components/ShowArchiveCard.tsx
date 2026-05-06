"use client";

/**
 * ShowArchiveCard.tsx
 *
 * Click-to-play YouTube card for the /show archive grid. Same UX
 * principle as EpisodeCard: thumbnail by default, swap to autoplay
 * iframe on click. Uses the yt-card / yt-card-thumb class names that
 * match the existing /show page styling.
 *
 * Modifier-clicks (cmd/ctrl/shift/middle) fall through to the YouTube
 * link so power users can still open in a new tab.
 */

import { useState, useRef, useEffect } from "react";
import { formatPublishedAgo } from "@/lib/youtube";

export type ShowArchiveCardData = {
  id: string;
  title: string;
  url: string;
  publishedAt: string;
  thumbnail: string;
};

export default function ShowArchiveCard({ video }: { video: ShowArchiveCardData }) {
  const [playing, setPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const embedSrc =
    `https://www.youtube.com/embed/${video.id}` +
    `?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

  function handleClick(e: React.MouseEvent) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    setPlaying(true);
  }

  useEffect(() => {
    if (playing && iframeRef.current) {
      iframeRef.current.focus();
    }
  }, [playing]);

  if (playing) {
    return (
      <div className="yt-card yt-card-playing">
        <div className="yt-card-thumb">
          <iframe
            ref={iframeRef}
            src={embedSrc}
            title={video.title}
            className="yt-card-iframe"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
        <div className="yt-card-body">
          <h4 className="yt-card-title">{video.title}</h4>
          <span className="yt-card-date">
            {formatPublishedAgo(video.publishedAt)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener"
      onClick={handleClick}
      className="yt-card"
      aria-label={`Play "${video.title}"`}
    >
      <div className="yt-card-thumb">
        <img
          src={video.thumbnail}
          alt=""
          loading="lazy"
          decoding="async"
          className="yt-card-thumb-img"
        />
        <div className="yt-card-play">▶</div>
      </div>
      <div className="yt-card-body">
        <h4 className="yt-card-title">{video.title}</h4>
        <span className="yt-card-date">
          {formatPublishedAgo(video.publishedAt)}
        </span>
      </div>
    </a>
  );
}
