/**
 * HipHopBeatBlock — hip-hop-tailored Beat Store + Bundle block.
 *
 * Drops into the /hiphop pillar page via PillarHub's `extraSection` prop.
 * Voice is rapper-/producer-facing — different framing than the homepage
 * BeatStore (cultural teaser) or the Shop tier ladder (full storefront).
 */
import Link from "next/link";
import { BEATS } from "@/data/beats";

export default function HipHopBeatBlock() {
  // Surface 4 paid beats — first one from each category if we can find them,
  // else just the first 4. Keeps the strip varied across the four sounds the
  // 100-beat catalog covers.
  const paidBeats = BEATS.filter((b) => !b.isFree);
  const totalPaid = paidBeats.length;
  const featured = ["east-coast", "west-coast", "trap", "rage"]
    .map((cat) => paidBeats.find((b) => b.category === cat))
    .filter((b): b is NonNullable<typeof b> => Boolean(b))
    .slice(0, 4);
  const display = featured.length === 4 ? featured : paidBeats.slice(0, 4);

  return (
    <section
      className="pillar-beat-block"
      style={{
        margin: "56px 0 16px",
        background:
          "linear-gradient(135deg, rgba(255,106,26,0.07) 0%, rgba(200,38,44,0.05) 100%)",
        border: "1px solid rgba(255,106,26,0.25)",
        borderRadius: "18px",
        padding: "36px 28px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div style={{ flex: "1 1 360px", minWidth: 280 }}>
          <span className="eyebrow">Beats · 100 In The Catalog</span>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)",
              fontWeight: 800,
              margin: "10px 0 8px",
              lineHeight: 1.15,
            }}
          >
            Beats For Your Next Drop —{" "}
            <span className="accent">East Coast, West Coast, Trap, Rage.</span>
          </h2>
          <p style={{ margin: 0, lineHeight: 1.55, opacity: 0.9 }}>
            Producer-grade, mastered, ready to go. Free Standard license to test
            the waters. $34.99 single-beat lease for one track. The Vault for
            artists building a whole project.
          </p>
        </div>
      </div>

      {/* Featured beats strip — one from each category */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 12,
          marginBottom: 28,
        }}
      >
        {display.map((b) => (
          <Link
            key={b.id}
            href={`/beats#${b.slug}`}
            className="shop-beat-tile"
            style={{
              textDecoration: "none",
              padding: "16px",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 12,
              background: "rgba(0,0,0,0.25)",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--accent, #FF6A1A)",
              }}
            >
              {b.categoryLabel}
            </span>
            <span style={{ fontSize: "0.98rem", fontWeight: 700 }}>
              {b.title}
            </span>
            <span style={{ fontSize: "0.85rem", opacity: 0.75 }}>
              {b.bpm ? `${b.bpm} BPM · ` : ""}${b.priceUSD}
            </span>
          </Link>
        ))}
      </div>

      {/* Bundle promo + browse-all CTAs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 16,
        }}
        className="pillar-beat-block-ctas"
      >
        <Link
          href="/beats/bundles"
          style={{
            background: "linear-gradient(135deg, #FF6A1A 0%, #c8262c 100%)",
            color: "#fff",
            padding: "22px 24px",
            borderRadius: 14,
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <div>
            <span
              style={{
                display: "inline-block",
                fontSize: "0.74rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "3px 9px",
                border: "1.2px solid rgba(255,255,255,0.6)",
                borderRadius: 999,
                marginBottom: 8,
              }}
            >
              ⚡ The Vault — $79
            </span>
            <h3
              style={{
                margin: 0,
                fontSize: "clamp(1.25rem, 2.2vw, 1.6rem)",
                fontWeight: 800,
                lineHeight: 1.15,
              }}
            >
              100 mastered beats. Drum kits. Sample pack. T-shirt.
            </h3>
            <p style={{ margin: "8px 0 0", fontSize: "0.95rem", opacity: 0.95 }}>
              Build a whole project for the price of a couple beats. Free entry
              to the $10K Rap Challenge included.
            </p>
          </div>
          <span
            className="btn"
            style={{
              alignSelf: "flex-start",
              background: "#0F0F12",
              color: "#fff",
              border: "1px solid #0F0F12",
              padding: "10px 18px",
              borderRadius: 999,
              fontWeight: 700,
            }}
          >
            Unlock The Vault →
          </span>
        </Link>

        <Link
          href="/beats"
          style={{
            background: "rgba(0,0,0,0.35)",
            border: "1px solid rgba(255,255,255,0.18)",
            color: "#fff",
            padding: "22px 24px",
            borderRadius: 14,
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <div>
            <span className="eyebrow">Single Beat Lease · $34.99</span>
            <h3
              style={{
                margin: "8px 0 0",
                fontSize: "clamp(1.15rem, 1.9vw, 1.4rem)",
                fontWeight: 800,
                lineHeight: 1.2,
              }}
            >
              Pick one. Lease it. Ship the track.
            </h3>
            <p style={{ margin: "8px 0 0", fontSize: "0.92rem", opacity: 0.85 }}>
              Untagged WAV, instant download, all platforms. {totalPaid} paid
              beats live in the catalog.
            </p>
          </div>
          <span
            className="btn btn-ghost btn-arrow"
            style={{
              alignSelf: "flex-start",
              padding: "10px 18px",
              borderRadius: 999,
            }}
          >
            Browse Beat Store
          </span>
        </Link>
      </div>
    </section>
  );
}
