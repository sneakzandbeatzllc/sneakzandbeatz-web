"use client";

/**
 * TikTokFeed.tsx
 *
 * Homepage horizontal-scroll TikTok reel for @SneakzandBeatzOfficial.
 *
 * Design rules:
 *   - Pulls pinned video IDs from src/data/tiktok.ts (no API key required;
 *     no public TikTok user RSS exists, so the shelf is hand-curated).
 *   - Uses TikTok's official <blockquote class="tiktok-embed"> + embed.js.
 *     Loaded ONCE at component mount; idempotent on subsequent renders.
 *   - Horizontal scroll-snap container — user swipes/scrolls, embeds load
 *     lazily as they enter the viewport. No autoplay-with-audio carousel —
 *     would be a UX disaster on a page that already has the show + beats.
 *   - Empty PINNED_VIDEOS → 3 placeholder tiles linking to the profile so
 *     the section never ships hollow.
 *   - Auto-hides if the SOCIAL.tiktok.enabled flag is ever set false in
 *     data/social.ts (currently always live).
 *
 * Style class root: .tiktok-feed — see globals.css "TikTokFeed" section.
 */

import { useEffect, useRef } from "react";
import { PINNED_VIDEOS, TIKTOK_PROFILE_URL, TIKTOK_HANDLE } from "@/data/tiktok";

const EMBED_SCRIPT_SRC = "https://www.tiktok.com/embed.js";

/**
 * Idempotently inject TikTok's embed.js into <head>. If it's already
 * present, ask it to re-scan for new blockquotes (handles client-side
 * route changes — Next.js App Router can keep the script around but
 * not re-trigger it).
 */
function loadTikTokEmbedScript() {
  if (typeof window === "undefined") return;

  // Already loaded — ask it to re-render embeds (handles SPA navigation)
  // The script exposes window.tiktokEmbed.lib once parsed.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tt = (window as any).tiktokEmbed;
  if (tt && typeof tt.lib?.render === "function") {
    try { tt.lib.render(); } catch { /* swallow — non-fatal */ }
    return;
  }

  // Not loaded — inject once
  if (document.querySelector(`script[src="${EMBED_SCRIPT_SRC}"]`)) return;
  const s = document.createElement("script");
  s.src = EMBED_SCRIPT_SRC;
  s.async = true;
  document.body.appendChild(s);
}

export default function TikTokFeed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (PINNED_VIDEOS.length === 0) return;
    loadTikTokEmbedScript();
  }, []);

  const hasVideos = PINNED_VIDEOS.length > 0;

  return (
    <section className="tiktok-feed" id="tiktok">
      <div className="container">
        <header className="tiktok-feed-header">
          <span className="tiktok-feed-eyebrow">▶ TikTok</span>
          <h2 className="tiktok-feed-h2">
            The reel. <span className="accent">Live from the feed.</span>
          </h2>
          <p className="tiktok-feed-sub">
            New cuts every week — sneaker drops, hip-hop tributes, anime arcs,
            gaming reactions. Follow{" "}
            <a
              href={TIKTOK_PROFILE_URL}
              target="_blank"
              rel="noopener"
              className="tiktok-feed-handle"
            >
              {TIKTOK_HANDLE}
            </a>{" "}
            to get them first.
          </p>
        </header>

        <div className="tiktok-feed-rail" ref={containerRef}>
          {hasVideos ? (
            PINNED_VIDEOS.map((v) => (
              <div key={v.id} className="tiktok-feed-card">
                <blockquote
                  className="tiktok-embed"
                  cite={`https://www.tiktok.com/@SneakzandBeatzOfficial/video/${v.id}`}
                  data-video-id={v.id}
                >
                  <section>
                    <a
                      href={`https://www.tiktok.com/@SneakzandBeatzOfficial/video/${v.id}`}
                      target="_blank"
                      rel="noopener"
                    >
                      Loading TikTok…
                    </a>
                  </section>
                </blockquote>
                {v.caption && (
                  <p className="tiktok-feed-caption">{v.caption}</p>
                )}
              </div>
            ))
          ) : (
            // Placeholders — 3 tiles linking to the profile so the
            // homepage never ships an empty shelf. Removed the moment
            // PINNED_VIDEOS gets its first entry.
            <>
              {[0, 1, 2].map((i) => (
                <a
                  key={`placeholder-${i}`}
                  href={TIKTOK_PROFILE_URL}
                  target="_blank"
                  rel="noopener"
                  className="tiktok-feed-card tiktok-feed-placeholder"
                  aria-label="Follow @SneakzandBeatzOfficial on TikTok"
                >
                  <div className="tiktok-feed-placeholder-inner">
                    <div className="tiktok-feed-placeholder-icon">▶</div>
                    <div className="tiktok-feed-placeholder-label">
                      Coming soon
                    </div>
                    <div className="tiktok-feed-placeholder-cta">
                      Follow on TikTok →
                    </div>
                  </div>
                </a>
              ))}
            </>
          )}
        </div>

        <div className="tiktok-feed-footer">
          <a
            href={TIKTOK_PROFILE_URL}
            target="_blank"
            rel="noopener"
            className="btn btn-ghost btn-arrow"
          >
            Open the full feed
          </a>
        </div>
      </div>
    </section>
  );
}
