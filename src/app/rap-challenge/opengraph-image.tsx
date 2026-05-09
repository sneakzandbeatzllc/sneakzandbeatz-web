import { ImageResponse } from "next/og";

export const alt = "$10K Rap Challenge — Sneakz & Beatz";
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
            "linear-gradient(135deg, #FF6A1A 0%, #c8262c 60%, #6a1414 100%)",
          color: "#fff",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "8px 18px",
            border: "1.5px solid rgba(255,255,255,0.85)",
            borderRadius: 999,
            alignSelf: "flex-start",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          ⚡ The Rap Challenge · Waitlist Open
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
            Submit a rap.
            <br />
            Win $10K.
          </div>
          <div style={{ fontSize: 28, fontWeight: 500, opacity: 0.92, maxWidth: 1040 }}>
            $2,500 cash · PS5 Pro · $500 StockX · custom 1-of-1 sneaker · exclusive beats. Free with the Vault. Free via AMOE.
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
          <span>sneakzandbeatz.com/rap-challenge</span>
          <span style={{ opacity: 0.85 }}>Sneakz & Beatz</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
