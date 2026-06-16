/**
 * SneakerOfTheDay — vertical (9:16) hero card beside the RoomHero headline.
 * Plays PHRHX's own clip on autoplay + loop (muted; controls let viewers
 * unmute). No caption under it. Operator updates by dropping a new
 * public/sneaker-of-the-day.mp4.
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
    </div>
  );
}
