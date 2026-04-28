/**
 * CommunityAIGallery.tsx
 *
 * Renders the "Community AI · S&B Images" reel — a horizontal-scroll grid
 * of AI-generated images submitted (or dropped) into the AI_Images/community/
 * folder. Newest first, capped at 30 by the build script.
 *
 * Variants (via prop):
 *   - "full": full grid section, used on /community page
 *   - "preview": short horizontal scroll strip, used on the homepage
 *
 * Auto-hides if the manifest has 0 items (graceful fallback during early days).
 */

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

type GalleryItem = {
  filename: string;
  url: string;
  alt: string;
  mtime: number;
};

type GalleryManifest = {
  schema?: number;
  generated_utc?: string;
  count?: number;
  items?: GalleryItem[];
};

function loadManifest(): GalleryItem[] {
  try {
    const path = join(process.cwd(), "public", "community-gallery.json");
    if (!existsSync(path)) return [];
    const raw = readFileSync(path, "utf-8");
    const data = JSON.parse(raw) as GalleryManifest;
    if (!data || !Array.isArray(data.items)) return [];
    return data.items.filter((it) => it && it.url);
  } catch {
    return [];
  }
}

type Props = {
  variant?: "full" | "preview";
  /** Optional limit override. Defaults: full=30, preview=10. */
  limit?: number;
};

export default function CommunityAIGallery({ variant = "full", limit }: Props) {
  const items = loadManifest();
  const cap = limit ?? (variant === "preview" ? 10 : 30);
  const shown = items.slice(0, cap);

  if (shown.length === 0) return null;

  if (variant === "preview") {
    return (
      <section className="container ai-gallery-preview">
        <header className="ai-gallery-preview-header">
          <span className="ai-gallery-eyebrow">⚡ Community AI · S&B Images</span>
          <a href="/community#ai-gallery" className="ai-gallery-link">
            See the full reel →
          </a>
        </header>
        <div className="ai-gallery-strip">
          {shown.map((it) => (
            <a
              key={it.filename}
              href={it.url}
              target="_blank"
              rel="noopener"
              className="ai-gallery-strip-item"
            >
              <img src={it.url} alt={it.alt} loading="lazy" />
            </a>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="ai-gallery" className="container ai-gallery-full">
      <header className="ai-gallery-header">
        <span className="ai-gallery-eyebrow">⚡ Community AI · S&B Images</span>
        <h2 className="ai-gallery-h2">
          The community&rsquo;s AI takes on the brand
        </h2>
        <p className="ai-gallery-sub">
          Drop into the Discord, generate something on theme — sneakers, hip-hop,
          anime, gaming — and it lands here. Newest first. {shown.length} live right now.
        </p>
      </header>
      <div className="ai-gallery-grid">
        {shown.map((it) => (
          <a
            key={it.filename}
            href={it.url}
            target="_blank"
            rel="noopener"
            className="ai-gallery-card"
          >
            <img src={it.url} alt={it.alt} loading="lazy" />
            <div className="ai-gallery-card-overlay">
              <span className="ai-gallery-card-alt">{it.alt}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
