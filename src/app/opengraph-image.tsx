import { ImageResponse } from "next/og";

export const runtime = "edge";

// Sitewide / homepage OG image. Other routes (show, beats, rap-challenge,
// the-lane, sneakz-pass, about) ship their own opengraph-image.tsx that
// override this one. This is the fallback for any page without a more
// specific image.

export const alt =
  "Sneakz & Beatz — Sneakers, Hip-Hop, Anime, Gaming. Black-owned culture brand.";
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
            "linear-gradient(135deg, #0F0F12 0%, #1a1a22 40%, #2a1010 100%)",
          color: "#fff",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
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
          Black-owned · Four pillars · Daily
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 132,
              fontWeight: 900,
              lineHeight: 0.96,
              letterSpacing: "-0.03em",
            }}
          >
            Sneakz <span style={{ color: "#FF6A1A" }}>&</span> Beatz
          </div>
          <div style={{ fontSize: 36, fontWeight: 600, opacity: 0.92, maxWidth: 1040 }}>
            Sneakers · Hip-Hop · Anime · Gaming
          </div>
          <div style={{ fontSize: 26, fontWeight: 500, opacity: 0.7, maxWidth: 1040 }}>
            Where the culture collides — drops, beats, episodes, the $10K Rap Challenge.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          <span>sneakzandbeatz.com</span>
          <span style={{ opacity: 0.7 }}>Built for the culture.</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
