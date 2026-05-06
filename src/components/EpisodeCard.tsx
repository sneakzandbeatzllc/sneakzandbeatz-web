"use client";

/**
 * EpisodeCard.tsx
 *
 * Click-to-play YouTube card for the homepage PHRHX Show shelf and the
 * /show page grid. Default state = thumbnail + play overlay (so we don't
 * inject 3 YouTube iframes on first paint — that tanks Lighthouse).
 * On click the thumbnail swaps for an autoplay iframe, keeping the
 * viewer ON sneakzandbeatz.com instead of bouncing to youtube.com.
 *
 * Right-click / long-press still opens YouTube in a new tab via the
 * underlying link, so users who *want* to leave can.
 */

import { useState, useRef, useEffect } from "react";

export type EpisodeCardData = {
  id: string;          // YouTube video ID
  title: string;
  href: string;        // YouTube watch URL — used as fallback link
  thumbnail?: string;
  publishedLabel?: string;
  isReal: boolean;
};

type Props = {
  episode: EpisodeCardData;
  isFeatured?: boolean;
  showLatestTag?: boolean;
};

export default function EpisodeCard({
  episode,
  isFeatured = false,
  showLatestTag = false,
}: Props) {
  const [playing, setPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Build the embed URL once it's needed. autoplay=1 + mute=0 is allowed
  // here because the iframe is mounted in response to a user click —
  // browsers honor the gesture and let it start with sound.
  const embedSrc =
    `https://www.youtube.com/embed/${episode.id}` +
    `?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

  function handleClick(e: React.MouseEvent) {
    // Allow modifier-clicks (cmd/ctrl/middle/shift) to fall through to
    // the underlying link's default behavior — that's how power users
    // open in a new tab.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;

    e.preventDefault();
    setPlaying(true);
  }

  // When playing flips on, focus the iframe so keyboard users land
  // on the video controls.
  useEffect(() => {
    if (playing && iframeRef.current) {
      iframeRef.current.focus();
    }
  }, [playing]);

  if (playing) {
    return (
      <div className={"episode episode-playing" + (isFeatured ? " featured" : "")}>
        <div className="thumb">
          <iframe
            ref={iframeRef}
            src={embedSrc}
            title={episode.title}
            className="episode-iframe"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
        <div className="meta">
          <div>
            {episode.publishedLabel && (
              <span className="ep-num">{episode.publishedLabel}</span>
            )}
            <h4>{episode.title}</h4>
          </div>
        </div>
      </div>
    );
  }

  return (
    <a
      href={episode.href}
      target="_blank"
      rel="noopener"
      onClick={handleClick}
      className={"episode" + (isFeatured ? " featured" : "")}
      aria-label={`Play "${episode.title}"`}
    >
      {episode.thumbnail ? (
        <div className="thumb thumb-image">
          <img
            src={episode.thumbnail}
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
      {showLatestTag && <span className="latest-tag">Latest</span>}
      <div className="play">
        <div className="play-icon">▶</div>
      </div>
      <div className="meta">
        <div>
          {episode.publishedLabel && (
            <span className="ep-num">{episode.publishedLabel}</span>
          )}
          <h4>{episode.title}</h4>
        </div>
      </div>
    </a>
  );
}
