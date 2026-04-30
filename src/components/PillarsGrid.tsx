import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fetchPillarCycles } from "@/lib/soc-cycles";

type PillarKey = "sneakers" | "hiphop" | "anime" | "gaming";

type Pillar = {
  slug: string;
  number: string;
  href: string;
  title: string;
  tagline: string;
  data: PillarKey;
  icon: string;
};

const PILLARS: Pillar[] = [
  { slug: "sneakers", number: "01", href: "/sneakers", title: "Sneakers",         tagline: "Latest drops & culture",   data: "sneakers", icon: "👟" },
  { slug: "hiphop",   number: "02", href: "/hiphop",   title: "Hip-Hop",          tagline: "Music · artists · stories", data: "hiphop",   icon: "🎤" },
  { slug: "anime",    number: "03", href: "/anime",    title: "Anime",            tagline: "News · reviews · culture",  data: "anime",    icon: "🍜" },
  { slug: "gaming",   number: "04", href: "/gaming",   title: "Gaming",           tagline: "News · gear · play",        data: "gaming",   icon: "🎮" },
];

/**
 * Look for a pillar background image at /public/photos/pillars/{slug}.{ext}.
 * Returns the public URL if found, else null. Caller falls back to the CSS
 * pattern background.
 *
 * Drop AI-generated images here (jpg/png/webp), the file is auto-picked up
 * on the next build. No code change required.
 */
function findPillarImage(slug: string): string | null {
  const exts = ["jpg", "jpeg", "png", "webp"];
  for (const ext of exts) {
    const fsPath = join(process.cwd(), "public", "photos", "pillars", `${slug}.${ext}`);
    if (existsSync(fsPath)) return `/photos/pillars/${slug}.${ext}`;
  }
  return null;
}

export default async function PillarsGrid() {
  // Fetch live story counts from SOC engine — each card shows "X stories today"
  const counts = await Promise.all(
    PILLARS.map((p) => fetchPillarCycles(p.data).then((items) => items.length))
  );

  return (
    <section className="pillars container" id="pillars">
      <div className="pillars-grid">
        {PILLARS.map((p, i) => {
          const count = counts[i];
          const imageUrl = findPillarImage(p.slug);
          return (
            <Link key={p.slug} className="pillar-card" data-pillar={p.data} href={p.href}>
              <div
                className={"photo" + (imageUrl ? " photo-image" : "")}
                style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
              />
              {!imageUrl && (
                <span className="pillar-card-icon" aria-hidden="true">{p.icon}</span>
              )}
              <span className="label-tag">{p.number} / Pillar</span>
              {count > 0 && (
                <span className="pillar-card-count">
                  <span className="pillar-card-count-num">{count}</span>
                  <span className="pillar-card-count-label">
                    {count === 1 ? "story" : "stories"}<br />today
                  </span>
                </span>
              )}
              <div className="meta">
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.tagline}</p>
                </div>
                <div className="arrow">→</div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
