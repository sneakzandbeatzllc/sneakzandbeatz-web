/**
 * RapChallengeBanner — full-width banner placed directly under the Hero.
 *
 * Above-the-fold conversion driver for the $10K Rap Challenge waitlist.
 * Bundle waiver positioning: $79 bundle includes free Standard Entry,
 * making the bundle the cheapest path into the prize pool.
 */
import Link from "next/link";

export default function RapChallengeBanner() {
  return (
    <section
      className="rap-banner"
      style={{
        background: "linear-gradient(135deg, #FF6A1A 0%, #c8262c 100%)",
        color: "#fff",
        padding: "28px 0",
        marginTop: "-1px",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "20px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: "1 1 360px", minWidth: 280 }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "4px 10px",
              border: "1.5px solid rgba(255,255,255,0.6)",
              borderRadius: "999px",
              marginBottom: "10px",
            }}
          >
            ⚡ The $10K Rap Challenge · Waitlist Open
          </span>
          <h2
            style={{
              margin: "0 0 6px",
              fontSize: "clamp(1.4rem, 2.6vw, 2rem)",
              fontWeight: 800,
              lineHeight: 1.15,
            }}
          >
            Submit a verse. Win a $10K prize package.
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: "0.98rem",
              lineHeight: 1.5,
              opacity: 0.95,
            }}
          >
            $2,500 cash · PS5 Pro · $500 StockX · custom 1-of-1 sneaker · monthly
            exclusive beats. Standard Entry $25. Free with the $79 bundle.
            Free via AMOE.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Link
            href="/rap-challenge"
            className="btn btn-primary btn-arrow"
            style={{
              background: "#0F0F12",
              color: "#fff",
              border: "1px solid #0F0F12",
            }}
          >
            Submit A Verse. Win $10K
          </Link>
          <Link
            href="/beats/bundles"
            className="btn btn-ghost btn-arrow"
            style={{
              background: "transparent",
              color: "#fff",
              border: "1.5px solid rgba(255,255,255,0.85)",
            }}
          >
            Get the $79 Vault (Free Entry)
          </Link>
        </div>
      </div>
    </section>
  );
}
