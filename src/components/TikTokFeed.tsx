"use client";

/**
 * TikTokFeed.tsx
 *
 * Homepage horizontal-scroll TikTok reel for @SneakzandBeatzOfficial.
 *
 * Auto-play architecture:
 *   - Uses TikTok's player v1 iframe (https://www.tiktok.com/player/v1/{id})
 *     with `autoplay=1&mute=1&loop=1` so videos play silently the moment
 *     the iframe mounts. Browsers require muted for autoplay; the user
 *     can tap to unmute.
 *   - Each card uses IntersectionObserver to delay iframe mount until
 *     the card scrolls into view (rootMargin 200px). This means only the
 *     visible video is fetching network/CPU; off-screen cards stay as
 *     lightweight skeletons until they're about to be seen.
 *   - Once an iframe has mounted, it stays mounted (avoids flicker on
 *     scroll-back). For more aggressive bandwidth control later we can
 *     add scroll-out unmount + postMessage pause to TikTok's player API.
 *
 * Fallbacks:
 *   - Empty PINNED_VIDEOS → 3 placeholder tiles linking to the profile so
 *     the section never ships hollow.
 *   - Card width is capped at 92vw on mobile so a single card never
 *     dominates the viewport.
 *
 * Style class root: .tiktok-feed — see globals.css "TikTokFeed" section.
 */

import { useEffect, useRef, useState } from "react";
import { PINNED_VIDEOS, TIKTOK_PROFILE_URL, TIKTOK_HANDLE, type PinnedTikTok } from "@/data/tiktok";

function TikTokVideoCard({ video }: { video: PinnedTikTok }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // If IntersectionObserver isn't supported (very old browsers), just
    // mount immediately — better to load a video than to show a blank.
    if (typeof IntersectionObserver === "undefined") {
      setShouldMount(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldMount(true);
            obs.disconnect(); // mount-once is enough
            return;
          }
        }
      },
      { rootMargin: "200px 0px" } // pre-load slightly before viewport edge
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // TikTok player v1 supports: autoplay, mute, loop, controls, description,
  // music_info as query params. We start muted (browser autoplay policy)
  // and let TikTok's UI handle unmute on tap.
  const playerUrl =
    `https://www.tiktok.com/player/v1/${video.id}` +
    `?autoplay=1&mute=1&loop=1&description=0&music_info=1&controls=1`;

  return (
    <div ref={containerRef} className="tiktok-feed-card">
      <div className="tiktok-feed-frame">
        {shouldMount ? (
          <iframe
            src={playerUrl}
            className="tiktok-feed-iframe"
            allow="autoplay; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            title={`TikTok video ${video.id}`}
            loading="lazy"
          />
        ) : (
          <div className="tiktok-feed-skeleton" aria-hidden="true">
            <div className="tiktok-feed-skeleton-icon">▶</div>
          </div>
        )}
      </div>
      {video.caption && (
        <p className="tiktok-feed-caption">{video.caption}</p>
      )}
    </div>
  );
}

export default function TikTokFeed() {
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

        <div className="tiktok-feed-rail">
          {hasVideos ? (
            PINNED_VIDEOS.map((v) => (
              <TikTokVideoCard key={v.id} video={v} />
            ))
          ) : (
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
