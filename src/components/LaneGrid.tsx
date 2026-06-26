import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import { getRankedEssays, type LaneEssay } from "@/data/lane-essays";

// Slug-named image in /public/lane wins; otherwise null (card uses the accent
// gradient). Same resolver the article page uses, so heroes are consistent.
const LANE_IMG_DIR = path.join(process.cwd(), "public", "lane");
function findHeroFile(slug: string): string | null {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    if (fs.existsSync(path.join(LANE_IMG_DIR, `${slug}.${ext}`))) {
      return `/lane/${slug}.${ext}`;
    }
  }
  return null;
}

const pillarLabel = (p?: string) =>
  p === "hiphop" ? "Hip-Hop" : p ? p.charAt(0).toUpperCase() + p.slice(1) : "The Lane";

// Reusable article grid. Trend-ranked (getRankedEssays). Optional pillar filter
// and limit. Every card shows the hero image when one exists.
export default function LaneGrid({
  pillar,
  limit,
  heading,
}: {
  pillar?: LaneEssay["pillar"];
  limit?: number;
  heading?: string;
}) {
  let items = getRankedEssays();
  if (pillar) items = items.filter((e) => e.pillar === pillar);
  if (limit) items = items.slice(0, limit);
  const cards = items.map((e) => ({ e, heroSrc: e.heroImage ?? findHeroFile(e.slug) }));
  if (cards.length === 0) return null;

  return (
    <section className="container" style={{ padding: "32px 0" }}>
      {heading && (
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 18,
          }}
        >
          <h2 style={{ margin: 0, fontSize: "1.6rem", fontWeight: 800 }}>{heading}</h2>
          <Link href="/the-lane" style={{ fontSize: "0.9rem", opacity: 0.8 }}>
            View all &rarr;
          </Link>
        </div>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {cards.map(({ e, heroSrc }) => (
          <Link
            key={e.slug}
            href={`/the-lane/${e.slug}`}
            style={{
              display: "block",
              border: "1px solid var(--rule, #2a2a30)",
              borderRadius: 12,
              overflow: "hidden",
              textDecoration: "none",
              color: "inherit",
              background: "var(--card, #111)",
            }}
          >
            {heroSrc ? (
              <div style={{ aspectRatio: "16 / 9", overflow: "hidden", background: "#0a0a0a" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroSrc}
                  alt={e.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            ) : (
              <div
                style={{
                  aspectRatio: "16 / 9",
                  background: `radial-gradient(120% 140% at 100% 0%, #${e.ogAccent} 0%, rgba(10,10,10,0.2) 60%), #0a0a0a`,
                }}
              />
            )}
            <div style={{ padding: 16 }}>
              <span
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 800,
                  opacity: 0.7,
                }}
              >
                {pillarLabel(e.pillar)}
              </span>
              <h3 style={{ margin: "8px 0 6px", fontSize: "1.05rem", lineHeight: 1.25 }}>
                {e.title}
              </h3>
              <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.75, lineHeight: 1.4 }}>
                {e.subhead}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
