"use client";

import { useRef, useState } from "react";

// 30s Vault promo video. Sits directly under the BeatLabV3 banner.
// Autoplays muted + looping (browser requirement); tap to bring in the beat.
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
    <section className="container" style={{ padding: "4px 0 40px" }}>
      <div
        style={{
          position: "relative",
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid var(--rule, #2a2a30)",
          background: "#000",
          lineHeight: 0,
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
            right: 14,
            bottom: 14,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 14px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.25)",
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(6px)",
            color: "#fff",
            fontSize: "0.8rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            cursor: "pointer",
          }}
        >
          {muted ? "🔊 Tap for sound" : "🔈 Mute"}
        </button>
      </div>
    </section>
  );
}
