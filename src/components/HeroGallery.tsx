/**
 * HeroGallery.tsx
 *
 * Replaces the static S&B logo in the homepage hero with a rotating photo
 * gallery sourced from /public/photos/ (root level, not subfolders).
 *
 * Drop a new .jpg/.png/.webp into the "Site Photos" Desktop shortcut and
 * it joins the rotation on next deploy. Excludes images inside subfolders
 * (pillars/, community/, etc.) so those don't pollute the hero.
 *
 * The cycling itself is pure CSS @keyframes — no client JS, no hydration
 * needed. Falls back to the static brand logo if 0 site photos exist.
 */

import Image from "next/image";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ALLOWED_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function loadSitePhotos(): string[] {
  try {
    const dir = join(process.cwd(), "public", "photos");
    if (!existsSync(dir)) return [];
    return readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isFile())
      .map((d) => d.name)
      .filter((name) => {
        const lower = name.toLowerCase();
        if (lower.startsWith(".")) return false; // .DS_Store, .gitkeep, etc.
        const dot = lower.lastIndexOf(".");
        if (dot < 0) return false;
        return ALLOWED_EXTS.has(lower.slice(dot));
      })
      .sort()
      .map((name) => `/photos/${name}`);
  } catch {
    return [];
  }
}

export default function HeroGallery() {
  const photos = loadSitePhotos();

  // No photos yet → fall back to the brand logo so the hero never ships empty
  if (photos.length === 0) {
    return (
      <div className="hero-art" aria-hidden="true">
        <Image
          src="/logo-mark-512.png"
          alt="Sneakz & Beatz brand mark"
          className="logo-mark"
          width={512}
          height={512}
          priority
        />
      </div>
    );
  }

  const total = photos.length;
  // Each image gets ~5s on screen with ~1s cross-fade
  const cycleSeconds = total * 5;

  return (
    <div className="hero-gallery" aria-hidden="true">
      {photos.map((src, i) => {
        const delay = (cycleSeconds / total) * i;
        return (
          <div
            key={src}
            className="hero-gallery-slide"
            style={{
              backgroundImage: `url(${src})`,
              animation: `heroFade ${cycleSeconds}s infinite`,
              animationDelay: `-${delay}s`,
            }}
          />
        );
      })}
      <div className="hero-gallery-overlay" />
    </div>
  );
}
