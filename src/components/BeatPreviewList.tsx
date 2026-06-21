"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

/**
 * BeatPreviewList — inline, click-to-listen beat previews.
 *
 * One shared <audio> element; clicking a play button starts that beat's
 * preview and stops any other. Self-contained inline styles so it can be
 * dropped into any server component (Shop "A taste from the catalog",
 * the Beat Lab bundle block, etc.) without touching globals.css.
 */

export type PreviewBeat = {
  slug: string;
  title: string;
  categoryLabel: string;
  bpm: number | null;
  priceUSD: number;
  previewUrl: string;
};

export default function BeatPreviewList({
  beats,
  variant = "grid",
}: {
  beats: PreviewBeat[];
  variant?: "grid" | "strip";
}) {
  const [playing, setPlaying] = useState<string | null>(null);
  const [pct, setPct] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = new window.Audio();
    el.preload = "none";
    audioRef.current = el;
    const onTime = () => {
      if (el.duration) setPct((el.currentTime / el.duration) * 100);
    };
    const onEnd = () => {
      setPlaying(null);
      setPct(0);
    };
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", onEnd);
    return () => {
      el.pause();
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", onEnd);
    };
  }, []);

  function toggle(b: PreviewBeat) {
    const el = audioRef.current;
    if (!el) return;
    if (playing === b.slug) {
      el.pause();
      setPlaying(null);
      setPct(0);
      return;
    }
    el.pause();
    el.src = b.previewUrl;
    el.currentTime = 0;
    el.play().catch(() => {
      /* autoplay blocked — user can click again */
    });
    setPlaying(b.slug);
    setPct(0);
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          variant === "strip"
            ? "repeat(auto-fit, minmax(220px, 1fr))"
            : "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 12,
      }}
    >
      {beats.map((b) => {
        const isPlaying = playing === b.slug;
        return (
          <div
            key={b.slug}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px",
              borderRadius: 14,
              background: "#141414",
              border: `1px solid ${isPlaying ? "#e0392b" : "#262626"}`,
              overflow: "hidden",
            }}
          >
            <button
              type="button"
              onClick={() => toggle(b)}
              aria-label={isPlaying ? `Pause ${b.title}` : `Play ${b.title}`}
              style={{
                flexShrink: 0,
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                background: "#e0392b",
                color: "#fff",
                fontSize: 15,
                lineHeight: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>
            <div style={{ minWidth: 0, flex: 1 }}>
              <Link
                href={`/beats#${b.slug}`}
                style={{
                  display: "block",
                  color: "#f4f1ea",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {b.title}
              </Link>
              <span style={{ color: "#8a8a8a", fontSize: "0.78rem" }}>
                {b.categoryLabel}
                {b.bpm ? ` · ${b.bpm} BPM` : ""} · ${b.priceUSD}
              </span>
            </div>
            {isPlaying && (
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  height: 3,
                  width: `${pct}%`,
                  background: "#e0392b",
                  transition: "width 0.15s linear",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
