/**
 * SneakerOfTheDay — a vertical (9:16), TikTok-style slot on the homepage for
 * PHRHX's own clip of the day's shoe. Operator uploads their video by adding
 * `public/sneaker-of-the-day.mp4` (and optionally a JPG poster). Until a clip
 * is uploaded, the branded SVG poster shows. No third-party content here —
 * this slot is operator-shot, fully owned.
 */
export default function SneakerOfTheDay() {
  return (
    <section className="container" style={{ padding: "48px 0" }}>
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <span
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent, #FF6A1A)",
            fontWeight: 700,
          }}
        >
          Sneaker of the Day
        </span>
        <h2 className="pillar-section-h" style={{ margin: "6px 0 0" }}>
          Today&rsquo;s Pick, On Foot
        </h2>
      </div>

      <div
        style={{
          maxWidth: 360,
          margin: "0 auto",
          aspectRatio: "9 / 16",
          borderRadius: 18,
          overflow: "hidden",
          border: "1px solid var(--rule, #2a2a30)",
          background: "#0c0c0f",
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          controls
          playsInline
          preload="metadata"
          poster="/sneaker-of-the-day-poster.svg"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        >
          <source src="/sneaker-of-the-day.mp4" type="video/mp4" />
        </video>
      </div>

      <p
        style={{
          textAlign: "center",
          marginTop: 12,
          fontSize: "0.8rem",
          opacity: 0.6,
        }}
      >
        Original content by PHRHX · The PHRHX Show
      </p>
    </section>
  );
}
