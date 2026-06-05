"use client";

/**
 * FeaturedYTPlayer.tsx
 *
 * Click-to-load wrapper for the /show "Latest episode" hero. Same lite-youtube
 * pattern as EpisodeCard / ShowArchiveCard — render a thumbnail by default,
 * mount the YouTube iframe only when the user clicks the play button. This
 * keeps the YouTube player JS (~500KB) off the critical path on first paint.
 *
 * Reuses the existing .yt-featured-player / .yt-featured-thumb-* CSS so this
 * component is a drop-in replacement for the old inline <iframe>.
 */

import { useState, useRef, useEffect } from "react";

type Props = {
  videoId: string;
  embedUrl: string;
  watchUrl: string;
  title: string;
  thumbnail?: string;
};

export default function FeaturedYTPlayer({
  videoId,
  embedUrl,
  watchUrl,
  title,
  thumbnail,
}: Props) {
  const [playing, setPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  function handleClick(e: React.MouseEvent) {
    // Modifier-clicks (cmd/ctrl/shift/middle) fall through to the underlying
    // link → opens in YouTube directly, which is what power users expect.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    setPlaying(true);
  }

  // After the iframe mounts, focus it so keyboard users land on the controls.
  useEffect(() => {
    if (playing && iframeRef.current) {
      iframeRef.current.focus();
    }
  }, [playing]);

  if (playing) {
    return (
      <iframe
        ref={iframeRef}
        // autoplay=1 is honored because we mounted in response to a user click.
        src={`${embedUrl}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    );
  }

  // Default state: thumbnail + play overlay. <a> wraps it so right-click /
  // long-press / cmd-click takes you straight to YouTube — same pattern as
  // EpisodeCard.
  return (
    <a
      href={watchUrl}
      target="_blank"
      rel="noopener"
      onClick={handleClick}
      aria-label={`Play "${title}"`}
      className="yt-featured-thumb-link"
      style={{
        display: "block",
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#0F0F12",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {thumbnail ? (
        <img
          src={thumbnail}
          alt=""
          loading="eager"
          decoding="async"
          width={1280}
          height={720}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : null}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          // Lower-third anchor — keeps the play button off the subject's
          // face in YouTube auto-frames.
          top: "72%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 84,
          height: 84,
          borderRadius: "999px",
          background: "rgba(15, 15, 18, 0.78)",
          border: "2px solid rgba(255, 255, 255, 0.85)",
          color: "#fff",
          fontSize: 28,
          paddingLeft: 6,
          backdropFilter: "blur(2px)",
        }}
      >
        ▶
      </span>
    </a>
  );
}
