import { fetchYouTubeVideos, formatPublishedAgo, PHRHX_CHANNEL_ID } from "@/lib/youtube";

/**
 * ShowEmbed — big PHRHX Show player on the homepage, ABOVE Latest Articles.
 * ALWAYS renders. If the YouTube RSS fetch returns the latest episode we embed
 * it directly; if that fetch is empty on a given build we fall back to the
 * channel's uploads playlist (UC… → UU…), which is always embeddable. The
 * section never disappears again.
 */
export default async function ShowEmbed() {
  const videos = await fetchYouTubeVideos(undefined, 4);
  const latest = videos[0];
  const more = videos.slice(1, 4);

  // Uploads playlist id = channel id with the "UC" prefix swapped to "UU".
  const uploadsList = "UU" + PHRHX_CHANNEL_ID.slice(2);
  const embedSrc = latest
    ? latest.embedUrl
    : `https://www.youtube.com/embed/videoseries?list=${uploadsList}`;

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
        <strong>{latest ? latest.title : "The PHRHX Show — new episodes weekly"}</strong>
        {latest && (
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
