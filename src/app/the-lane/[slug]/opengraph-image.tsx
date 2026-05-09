import { ImageResponse } from "next/og";
import { getEssay } from "@/data/lane-essays";

export const runtime = "edge";

export const alt = "Lane essay — Sneakz & Beatz";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: { slug: string };
}) {
  const essay = getEssay(params.slug);
  if (!essay) {
    // Fallback if a stray slug ever hits this route.
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0F0F12",
            color: "#fff",
            fontSize: 60,
            fontWeight: 800,
          }}
        >
          The Lane — Sneakz & Beatz
        </div>
      ),
      { ...size },
    );
  }

  // Split ogHeadline on \n so each line stacks (Satori needs flex children
  // for vertical text stacking, can't render \n as a line break in JSX text).
  const lines = essay.ogHeadline.split("\n");

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
          background: `linear-gradient(135deg, #0F0F12 0%, #1a1a22 50%, #${essay.ogAccent}20 100%)`,
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
            color: `#${essay.ogAccent}`,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 14,
              height: 14,
              borderRadius: 999,
              background: `#${essay.ogAccent}`,
            }}
          />
          The Lane · Essay
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 92,
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
            }}
          >
            {lines.map((line, i) => (
              <span
                key={i}
                style={{
                  // Last line gets accent color
                  color: i === lines.length - 1 ? `#${essay.ogAccent}` : "#fff",
                }}
              >
                {line}
              </span>
            ))}
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 500,
              opacity: 0.78,
              maxWidth: 1040,
            }}
          >
            By PHRHX · Sneakz & Beatz
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
          <span>sneakzandbeatz.com/the-lane/{essay.slug}</span>
          <span style={{ opacity: 0.7 }}>Built for the culture.</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
