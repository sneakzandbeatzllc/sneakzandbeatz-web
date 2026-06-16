/**
 * SneakerOfTheDay — vertical (9:16) hero card beside the RoomHero headline.
 * Plays PHRHX's own clip of the day's shoe on autoplay + loop (muted so
 * browsers allow autoplay; controls let viewers unmute). Operator updates it
 * by dropping a new public/sneaker-of-the-day.mp4. Bare card (no section).
 */
export default function SneakerOfTheDay() {
  return (
    <div style={{ width: "100%", maxWidth: 320, margin: "0 auto" }}>
      <div
        style={{
          position: "relative",
          aspectRatio: "9 / 16",
          borderRadius: 18,
          overflow: "hidden",
          border: "1px solid var(--rule, #2a2a30)",
          background: "#0c0c0f",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          autoPlay
          loop
          muted
          playsInline
          controls
          preload="metadata"
          poster="/sneaker-of-the-day-poster.svg"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        >
          <source src="/sneaker-of-the-day.mp4" type="video/mp4" />
        </video>
      </div>
      <p
        style={{
          textAlign: "center",
          margin: "10px 0 0",
          fontSize: "0.75rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--accent, #FF6A1A)",
          fontWeight: 700,
        }}
      >
        Sneaker of the Day
      </p>
    </div>
  );
}
