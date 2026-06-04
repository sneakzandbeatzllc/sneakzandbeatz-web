import Link from "next/link";
import { LANE_ESSAYS } from "@/data/lane-essays";

/**
 * FeaturedLaneEssay — homepage authority slot.
 *
 * Picks the "four-pillar reader" essay as the strategic feature: it's the
 * one that explains who Sneakz & Beatz is for and what the brand believes,
 * which is the single biggest trust signal we can ship before audience
 * numbers exist. Renders as a wide card with an eyebrow, headline, subhead,
 * "Read the essay →" CTA, and a secondary link to The Lane index.
 *
 * Sits above the Beat Store on the homepage so a first-time visitor reads
 * a thesis before they see a price.
 */
export default function FeaturedLaneEssay() {
  // Strategic pick — the four-pillar reader essay reads as the brand thesis.
  // If you want to rotate, change this to LANE_ESSAYS[0] or filter by slug.
  const featured =
    LANE_ESSAYS.find((e) => e.slug === "four-pillar-reader") ?? LANE_ESSAYS[0];

  if (!featured) return null;

  return (
    <section className="featured-lane-essay">
      <div className="container">
        <Link
          href={`/the-lane/${featured.slug}`}
          className="featured-lane-card"
          style={{
            display: "block",
            padding: "44px 40px",
            borderRadius: 20,
            background:
              "linear-gradient(135deg, rgba(15,15,18,0.96) 0%, rgba(26,26,34,0.94) 60%, rgba(42,16,16,0.94) 100%)",
            color: "#fff",
            textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span
            className="eyebrow"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#FF6A1A",
              marginBottom: 18,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#FF6A1A",
              }}
            />
            The Lane · From the editorial
          </span>

          <h2
            style={{
              fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              margin: "0 0 12px",
              maxWidth: 900,
            }}
          >
            {featured.headline}
          </h2>

          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.5,
              opacity: 0.82,
              margin: "0 0 24px",
              maxWidth: 820,
            }}
          >
            {featured.subhead}
          </p>

          <span
            className="btn btn-primary btn-arrow"
            style={{ pointerEvents: "none" }}
          >
            Read the essay →
          </span>
        </Link>

        <p
          style={{
            marginTop: 16,
            fontSize: "0.92rem",
            opacity: 0.65,
            textAlign: "center",
          }}
        >
          Or browse all of{" "}
          <Link href="/the-lane" style={{ color: "#FF6A1A" }}>
            The Lane →
          </Link>{" "}
          — positioning + 4 cornerstone essays.
        </p>
      </div>
    </section>
  );
}
