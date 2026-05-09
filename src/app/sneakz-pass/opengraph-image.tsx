import { ImageResponse } from "next/og";

export const alt = "Sneakz Pass — $12/mo members-only access — Sneakz & Beatz";
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
            "linear-gradient(135deg, #0F0F12 0%, #1f1212 50%, #2a1a08 100%)",
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
          Sneakz Pass · Members-only
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 110,
              fontWeight: 900,
              lineHeight: 0.98,
              letterSpacing: "-0.02em",
            }}
          >
            Inside the culture.
            <br />
            <span style={{ color: "#FF6A1A" }}>$12/mo.</span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 500, opacity: 0.78, maxWidth: 1040 }}>
            Bonus episodes · members-only Discord · monthly exclusive beat · 24-hour first crack on every drop.
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
          <span>sneakzandbeatz.com/sneakz-pass</span>
          <span style={{ opacity: 0.7 }}>Sneakz & Beatz</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
