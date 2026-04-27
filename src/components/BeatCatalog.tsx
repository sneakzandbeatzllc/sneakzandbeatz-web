"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import type { Beat, BeatCategory } from "@/data/beats";

type Props = {
  beats: Beat[];
  categories: BeatCategory[];
};

export default function BeatCatalog({ beats, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [playingSlug, setPlayingSlug] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ slug: string; pct: number } | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize the single shared <audio> element on the client.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = new window.Audio();
    el.preload = "none";
    audioRef.current = el;
    const onTimeUpdate = () => {
      if (!playingSlug || !el.duration) return;
      setProgress({ slug: playingSlug, pct: (el.currentTime / el.duration) * 100 });
    };
    const onEnded = () => {
      setPlayingSlug(null);
      setProgress(null);
    };
    el.addEventListener("timeupdate", onTimeUpdate);
    el.addEventListener("ended", onEnded);
    return () => {
      el.pause();
      el.removeEventListener("timeupdate", onTimeUpdate);
      el.removeEventListener("ended", onEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-attach timeupdate listener when playingSlug changes so progress maps to the right card.
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTimeUpdate = () => {
      if (!playingSlug || !el.duration) return;
      setProgress({ slug: playingSlug, pct: (el.currentTime / el.duration) * 100 });
    };
    el.addEventListener("timeupdate", onTimeUpdate);
    return () => el.removeEventListener("timeupdate", onTimeUpdate);
  }, [playingSlug]);

  function togglePlay(beat: Beat) {
    const el = audioRef.current;
    if (!el) return;
    if (playingSlug === beat.slug) {
      el.pause();
      setPlayingSlug(null);
      setProgress(null);
      return;
    }
    el.pause();
    el.src = beat.previewUrl;
    el.currentTime = 0;
    el.play().catch(() => {
      // Autoplay can be blocked — user will click again
    });
    setPlayingSlug(beat.slug);
    setProgress({ slug: beat.slug, pct: 0 });
  }

  const filtered = useMemo(() => {
    if (activeCategory === "all") return beats;
    return beats.filter((b) => b.category === activeCategory);
  }, [beats, activeCategory]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: beats.length };
    categories.forEach((cat) => (c[cat.slug] = 0));
    beats.forEach((b) => (c[b.category] = (c[b.category] ?? 0) + 1));
    return c;
  }, [beats, categories]);

  return (
    <div>
      <div className="beat-filter">
        <button
          className={"beat-pill" + (activeCategory === "all" ? " active" : "")}
          onClick={() => setActiveCategory("all")}
        >
          All <span className="beat-pill-count">{counts.all}</span>
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            className={"beat-pill" + (activeCategory === cat.slug ? " active" : "")}
            onClick={() => setActiveCategory(cat.slug)}
          >
            {cat.label}
            <span className="beat-pill-count">{counts[cat.slug] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="beat-grid">
        {filtered.map((beat) => {
          const isPlaying = playingSlug === beat.slug;
          const pct = progress && progress.slug === beat.slug ? progress.pct : 0;
          const mins = beat.durationSec !== null ? Math.floor(beat.durationSec / 60) : null;
          const secs = beat.durationSec !== null
            ? String(Math.floor(beat.durationSec % 60)).padStart(2, "0") : null;
          return (
            <div key={beat.slug} className={"beat-card" + (isPlaying ? " playing" : "")}>
              {/* Cover: gradient by category + giant BPM + play overlay */}
              <button
                className="beat-cover"
                data-cat={beat.category}
                onClick={() => togglePlay(beat)}
                aria-label={isPlaying ? `Pause ${beat.title}` : `Play ${beat.title}`}
              >
                <span className="beat-cover-bpm">
                  {beat.bpm ?? "—"}
                  <small>BPM</small>
                </span>
                <span className="beat-cover-cat">{beat.categoryLabel}</span>
                {beat.isFree && <span className="beat-cover-free">FREE</span>}
                <span className={"beat-cover-play" + (isPlaying ? " playing" : "")}>
                  {isPlaying ? "❚❚" : "▶"}
                </span>
                <span className="beat-cover-progress" style={{ width: `${pct}%` }} />
              </button>

              {/* Metadata strip */}
              <div className="beat-strip">
                <div className="beat-title" title={beat.title}>{beat.title}</div>
                <div className="beat-meta">
                  {mins !== null && <span>{mins}:{secs}</span>}
                  <span className="beat-meta-dot">·</span>
                  <span className="beat-cat-badge" data-cat={beat.category}>
                    {beat.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Buy / get */}
              <div className="beat-buy">
                {beat.isFree ? (
                  <>
                    <span className="beat-price free">FREE</span>
                    <Link href="https://sneakzandbeatz.substack.com" target="_blank" rel="noopener" className="btn btn-ghost beat-cta">
                      Get →
                    </Link>
                  </>
                ) : (
                  <>
                    <span className="beat-price">
                      <span className="beat-price-currency">$</span>
                      {beat.priceUSD.toFixed(2)}
                    </span>
                    <Link href={`/beats/${beat.slug}`} className="btn btn-primary beat-cta">
                      Lease →
                    </Link>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p style={{ color: "var(--text-soft)", textAlign: "center", padding: "48px 0" }}>
          No beats in this category yet.
        </p>
      )}
    </div>
  );
}
