import Link from "next/link";
import { LANE_ESSAYS } from "@/data/lane-essays";

const PILLAR_LABEL: Record<string, string> = {
  sneakers: "Sneakers",
  hiphop: "Hip-Hop",
  anime: "Anime",
  gaming: "Gaming",
};

/**
 * LaneFeedHome — surfaces the latest articles (newest first) on the homepage.
 * Reads the same LANE_ESSAYS source as /the-lane and the pillar feeds, so a
 * new article shows up here automatically the moment it ships.
 */
export default function LaneFeedHome() {
  const articles = [...LANE_ESSAYS]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, 6);

  if (articles.length === 0) return null;

  return (
    <section className="container" style={{ padding: "48px 0" }}>
      <h2 className="pillar-section-h" style={{ marginBottom: 4 }}>
        Latest Articles
      </h2>
      <p style={{ margin: "0 0 22px", opacity: 0.7, fontSize: "0.95rem" }}>
        Written by PHRHX &amp; the Sneakz desk. New drops daily.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 18,
        }}
      >
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/the-lane/${a.slug}`}
            style={{
              display: "block",
              border: "1px solid var(--rule, #2a2a30)",
              borderRadius: 12,
              overflow: "hidden",
              textDecoration: "none",
              background: "var(--card, rgba(255,255,255,0.02))",
            }}
          >
            {a.heroImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={a.heroImage}
                alt={a.title}
                style={{
                  width: "100%",
                  height: 160,
                  objectFit: "cover",
                  display: "block",
                }}
              />
            )}
            <div style={{ padding: "16px 18px" }}>
              <span
                style={{
                  fontSize: "0.72rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--accent, #FF6A1A)",
                  fontWeight: 700,
                }}
              >
                {a.pillar ? PILLAR_LABEL[a.pillar] ?? "The Lane" : "The Lane"}
              </span>
              <h3
                style={{
                  margin: "8px 0 6px",
                  fontSize: "1.05rem",
                  lineHeight: 1.25,
                  color: "var(--text, #f4f4f5)",
                }}
              >
                {a.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.9rem",
                  opacity: 0.75,
                  lineHeight: 1.4,
                  color: "var(--text, #f4f4f5)",
                }}
              >
                {a.subhead}
              </p>
              {a.heroCredit && (
                <p style={{ margin: "10px 0 0", fontSize: "0.72rem", opacity: 0.5 }}>
                  Photo: {a.heroCredit}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 22 }}>
        <Link href="/the-lane" className="btn btn-ghost btn-arrow">
          All Articles
        </Link>
      </div>
    </section>
  );
}
