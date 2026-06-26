"use client";

import { useRef, useState } from "react";

// The Vault banner video. Renders IN PLACE of the static banner art
// (studio photo + $79 card) inside BeatLabV3 — same size/shape as the banner.
// Autoplays muted + loops (browser requirement); tap to bring in the beat.
export default function VaultAdVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  };

  return (
    <div
      style={{
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        lineHeight: 0,
        background: "#0a0405",
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={ref}
        src="/video/vault-79-ad.mp4"
        poster="/video/vault-79-ad-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onClick={toggleSound}
        style={{ display: "block", width: "100%", height: "auto", cursor: "pointer" }}
      />
      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Unmute the beat" : "Mute"}
        style={{
          position: "absolute",
          right: 12,
          bottom: 12,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 13px",
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.25)",
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(6px)",
          color: "#fff",
          fontSize: "0.78rem",
          fontWeight: 700,
          letterSpacing: "0.04em",
          cursor: "pointer",
        }}
      >
        {muted ? "🔊 Tap for sound" : "🔈 Mute"}
      </button>
    </div>
  );
}
