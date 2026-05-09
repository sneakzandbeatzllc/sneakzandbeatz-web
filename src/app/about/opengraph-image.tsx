import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "About PHRHX & Sneakz & Beatz";
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
            "linear-gradient(135deg, #0F0F12 0%, #1a1a22 50%, #20140a 100%)",
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
          About · The Story
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
            }}
          >
            Built for the culture.
            <br />
            <span style={{ color: "#FF6A1A" }}>Operated from San Diego.</span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 500, opacity: 0.78, maxWidth: 1040 }}>
            Black-owned. Founder PHRHX. Sneakers · Hip-Hop · Anime · Gaming.
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
          <span>sneakzandbeatz.com/about</span>
          <span style={{ opacity: 0.7 }}>Sneakz & Beatz</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
