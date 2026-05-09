import { ImageResponse } from "next/og";

// Per-page Open Graph image for /show. Generated at request time by
// Next.js Image Response API — Vercel caches it edge-side. Distinct from
// the sitewide /og-image.png so a tweet of /show doesn't look identical
// to a tweet of /beats.

export const alt = "The PHRHX Show — Sneakz & Beatz";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #0F0F12 0%, #1a1a22 50%, #2a1010 100%)",
          color: "#fff",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#FF6A1A",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#FF6A1A",
            }}
          />
          The PHRHX Show
        </div>

        {/* Main */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              maxWidth: 1040,
            }}
          >
            Long-form interviews.
            <br />
            <span style={{ color: "#FF6A1A" }}>Black culture moves first.</span>
          </div>
          <div style={{ fontSize: 30, fontWeight: 500, opacity: 0.78, maxWidth: 1040 }}>
            Sneakers · Hip-Hop · Anime · Gaming · Hosted by PHRHX
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          <span>sneakzandbeatz.com/show</span>
          <span style={{ opacity: 0.7 }}>Sneakz & Beatz</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
