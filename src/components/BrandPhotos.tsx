/**
 * BrandPhotos.tsx
 *
 * "S&B Girls × Brand Merch" homepage section. Showcases models wearing
 * Sneakz & Beatz merch — drop the photos into AI_Images/brand_photos/ and
 * the watcher mirrors them to /public/photos/brand/. This component reads
 * that folder at render and renders a magazine-style grid.
 *
 * Layout:
 *   - 1 hero image (left, taller, 4:5 aspect)
 *   - Right column: 4 smaller grid items (1:1)
 *   - Falls back to centered 3-up grid if fewer than 5 photos
 *
 * Auto-hides if 0 photos exist.
 */

import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ALLOWED_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function loadBrandPhotos(): string[] {
  try {
    const dir = join(process.cwd(), "public", "photos", "brand");
    if (!existsSync(dir)) return [];
    return readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isFile())
      .map((d) => d.name)
      .filter((name) => {
        const lower = name.toLowerCase();
        if (lower.startsWith(".")) return false;
        const dot = lower.lastIndexOf(".");
        if (dot < 0) return false;
        return ALLOWED_EXTS.has(lower.slice(dot));
      })
      .sort()
      .map((name) => `/photos/brand/${name}`);
  } catch {
    return [];
  }
}

export default function BrandPhotos() {
  const photos = loadBrandPhotos();

  if (photos.length === 0) return null;

  const hero = photos[0];
  const rest = photos.slice(1, 5); // up to 4 in the right column

  return (
    <section className="brand-photos container" id="sb-girls">
      <header className="brand-photos-header">
        <span className="brand-photos-eyebrow">⚡ S&B Girls × The Brand</span>
        <h2 className="brand-photos-h2">
          The look. The drop. <span className="accent">The energy.</span>
        </h2>
        <p className="brand-photos-sub">
          The S&B roster wearing the merch. New drops, behind-the-scenes shoots,
          campaign cuts. Want on the roster?{" "}
          <a href="/work-with-us">work-with-us</a>.
        </p>
      </header>

      <div className={`brand-photos-grid${rest.length === 0 ? " brand-photos-solo" : ""}`}>
        {hero && (
          <div className="brand-photos-hero">
            <img src={hero} alt="S&B brand merch — featured" loading="lazy" />
          </div>
        )}
        {rest.length > 0 && (
          <div className="brand-photos-side">
            {rest.map((src) => (
              <div key={src} className="brand-photos-tile">
                <img src={src} alt="S&B brand merch" loading="lazy" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
