import { fetchYouTubeVideos, formatPublishedAgo } from "@/lib/youtube";

/**
 * ShowEmbed — auto-pulls the latest PHRHX Show episode from the channel's
 * YouTube RSS (same source as OnAirBar/ProgramGuide) and plays it inline on
 * the homepage. Recent episodes show below as a clickable rail. Returns null
 * if the feed can't be reached, so the page degrades gracefully.
 */
export default async function ShowEmbed() {
  const videos = await fetchYouTubeVideos(undefined, 4);
  const latest = videos[0];
  if (!latest) return null;
  const more = videos.slice(1, 4);

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
          src={latest.embedUrl}
          title={latest.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        />
      </div>

      <p style={{ margin: "12px 0 0", fontSize: "0.95rem", color: "var(--text, #f4f4f5)" }}>
        <strong>{latest.title}</strong>{" "}
        <span style={{ opacity: 0.6 }}>· {formatPublishedAgo(latest.publishedAt)}</span>
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
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.85rem",
                    lineHeight: 1.35,
                    color: "var(--text, #f4f4f5)",
                  }}
                >
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
