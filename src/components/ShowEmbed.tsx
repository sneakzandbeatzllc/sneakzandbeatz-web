import { fetchYouTubeVideos, formatPublishedAgo } from "@/lib/youtube";
import { FALLBACK_VIDEOS } from "@/data/youtube-fallback";

/**
 * ShowEmbed — homepage PHRHX Show player. Prefers the live build-time RSS pull;
 * if that's empty (Vercel IPs blocked), falls back to youtube-fallback.ts, which
 * is refreshed from the Mac via REFRESH_SHOW_VIDEOS.command. Always shows real,
 * embeddable, recent episodes — never "video unavailable".
 */
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
