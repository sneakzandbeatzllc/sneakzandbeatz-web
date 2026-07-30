import { fetchYouTubeVideos, formatPublishedAgo, type YouTubeVideo } from "@/lib/youtube";

/**
 * ShowEmbed — big PHRHX Show player on the homepage. ALWAYS renders a real,
 * embeddable video. If the build-time YouTube RSS fetch comes back empty
 * (Vercel IPs blocked / stale cache), we fall back to a hardcoded list of
 * real episodes instead of the uploads-playlist embed, which can render
 * "This video is unavailable".
 */
const FALLBACK_VIDEOS: YouTubeVideo[] = [
  { id: "2SBnn0bY2xY", title: "The New S&B!", url: "https://www.youtube.com/watch?v=2SBnn0bY2xY", publishedAt: "", thumbnail: "https://i.ytimg.com/vi/2SBnn0bY2xY/hqdefault.jpg", thumbnailHigh: "https://i.ytimg.com/vi/2SBnn0bY2xY/maxresdefault.jpg", embedUrl: "https://www.youtube.com/embed/2SBnn0bY2xY" },
  { id: "MpvEDKUeNes", title: "Rap's BIGGEST Flop Stars of 2025!", url: "https://www.youtube.com/watch?v=MpvEDKUeNes", publishedAt: "", thumbnail: "https://i.ytimg.com/vi/MpvEDKUeNes/hqdefault.jpg", thumbnailHigh: "https://i.ytimg.com/vi/MpvEDKUeNes/maxresdefault.jpg", embedUrl: "https://www.youtube.com/embed/MpvEDKUeNes" },
  { id: "YamAo3IAhao", title: "Sneakz & Beatz Live Stream", url: "https://www.youtube.com/watch?v=YamAo3IAhao", publishedAt: "", thumbnail: "https://i.ytimg.com/vi/YamAo3IAhao/hqdefault.jpg", thumbnailHigh: "https://i.ytimg.com/vi/YamAo3IAhao/maxresdefault.jpg", embedUrl: "https://www.youtube.com/embed/YamAo3IAhao" },
];

export default async function ShowEmbed() {
  const live = await fetchYouTubeVideos(undefined, 11);
  const videos = live.length > 0 ? live : FALLBACK_VIDEOS;
  const latest = videos[0];
  const more = videos.slice(1, 11);
  const embedSrc = latest.embedUrl;

  return (
    <section className="container" style={{ padding: "48px 0" }}>
      <div style={{ marginBottom: 18 }}>
        <span
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent, #FF6A1A)",
            fontWeight: 700,
          }}
        >
          The PHRHX Show · Now Playing
        </span>
        <h2 className="pillar-section-h" style={{ margin: "6px 0 0" }}>
          Watch The Latest Episode
        </h2>
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid var(--rule, #2a2a30)",
          background: "#000",
        }}
      >
        <iframe
          src={embedSrc}
          title="The PHRHX Show"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        />
      </div>

      <p style={{ margin: "12px 0 0", fontSize: "0.95rem", color: "var(--text, #f4f4f5)" }}>
        <strong>{latest.title}</strong>
        {latest.publishedAt && (
          <span style={{ opacity: 0.6 }}> · {formatPublishedAgo(latest.publishedAt)}</span>
        )}
      </p>

      {more.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 14,
            marginTop: 20,
          }}
        >
          {more.map((v) => (
            <a
              key={v.id}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                textDecoration: "none",
                border: "1px solid var(--rule, #2a2a30)",
                borderRadius: 10,
                overflow: "hidden",
                background: "var(--card, rgba(255,255,255,0.02))",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={v.thumbnail}
                alt={v.title}
                style={{ width: "100%", height: 120, objectFit: "cover", display: "block" }}
              />
              <div style={{ padding: "10px 12px" }}>
                <p style={{ margin: 0, fontSize: "0.85rem", lineHeight: 1.35, color: "var(--text, #f4f4f5)" }}>
                  {v.title}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}

      <div style={{ marginTop: 18 }}>
        <a href="/show" className="btn btn-ghost btn-arrow">
          All Episodes
        </a>
      </div>
    </section>
  );
}
