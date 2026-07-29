/**
 * render-md.tsx
 *
 * Server-side markdown renderer for Lane essays. Supports:
 *   - `## Heading` -> <h2>
 *   - paragraphs (blank-line separated)
 *   - `**bold**`, `*italic*`, `_italic_`
 *   - `[link text](url)` — external opens in a new tab
 *   - `- item` lists
 *   - `---` horizontal rule
 *   - `> quote` blockquote
 *   - `![alt](src "Credit Name|https://credit-url")` — in-body image w/ credit caption
 *   - `!youtube(URL_or_ID)` — responsive, lazy-loaded video embed
 */

import React from "react";

function renderInline(text: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  let buf = text;
  let key = 0;
  const RX =
    /\*\*([^*]+)\*\*|\*([^*]+)\*|_([^_]+)_|\[([^\]]+)\]\(([^)]+)\)/;
  while (true) {
    const m = buf.match(RX);
    if (!m) {
      if (buf) tokens.push(buf);
      break;
    }
    const idx = m.index ?? 0;
    if (idx > 0) tokens.push(buf.slice(0, idx));
    if (m[1] != null) {
      tokens.push(<strong key={`b${key++}`}>{m[1]}</strong>);
    } else if (m[2] != null) {
      tokens.push(<em key={`i${key++}`}>{m[2]}</em>);
    } else if (m[3] != null) {
      tokens.push(<em key={`u${key++}`}>{m[3]}</em>);
    } else if (m[4] != null && m[5] != null) {
      const href = m[5];
      const isExternal = /^https?:\/\//.test(href);
      tokens.push(
        <a
          key={`a${key++}`}
          href={href}
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {m[4]}
        </a>,
      );
    }
    buf = buf.slice(idx + m[0].length);
  }
  return tokens;
}

function ytId(raw: string): string {
  const s = raw.trim();
  const m = s.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{6,})/);
  return m ? m[1] : s;
}

export function renderMarkdown(src: string): React.ReactNode {
  const blocks = src.split(/\n\s*\n/).map((b) => b.replace(/^\s+|\s+$/g, ""));
  const out: React.ReactNode[] = [];

  blocks.forEach((block, i) => {
    if (!block) return;

    if (/^---+$/.test(block)) {
      out.push(<hr key={`hr${i}`} />);
      return;
    }

    // YouTube embed — !youtube(URL or ID) on its own line
    const yt = block.match(/^!youtube\(([^)]+)\)$/);
    if (yt) {
      const id = ytId(yt[1]);
      out.push(
        <div
          key={`yt${i}`}
          style={{
            position: "relative",
            width: "100%",
            paddingTop: "56.25%",
            margin: "24px 0",
            borderRadius: 12,
            overflow: "hidden",
            background: "#000",
          }}
        >
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}`}
            title="Video"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
          />
        </div>,
      );
      return;
    }

    // In-body image — ![alt](src "Credit|https://url") on its own line
    const img = block.match(
      /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/,
    );
    if (img) {
      const alt = img[1] || "";
      const isrc = img[2];
      const credRaw = img[3] || "";
      const [credName, credUrl] = credRaw.split("|");
      out.push(
        <figure key={`fig${i}`} style={{ margin: "24px 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={isrc}
            alt={alt}
            loading="lazy"
            style={{ width: "100%", borderRadius: 12, display: "block" }}
          />
          {credName ? (
            <figcaption
              style={{ fontSize: "0.78rem", opacity: 0.6, marginTop: 8 }}
            >
              Photo:{" "}
              {credUrl ? (
                <a href={credUrl} target="_blank" rel="noopener noreferrer">
                  {credName}
                </a>
              ) : (
                credName
              )}
            </figcaption>
          ) : null}
        </figure>,
      );
      return;
    }

    const h2 = block.match(/^## (.+)$/);
    if (h2) {
      out.push(<h2 key={`h${i}`}>{renderInline(h2[1])}</h2>);
      return;
    }

    if (/^> /.test(block)) {
      const inner = block
        .split("\n")
        .map((line) => line.replace(/^> ?/, ""))
        .join(" ");
      out.push(<blockquote key={`bq${i}`}>{renderInline(inner)}</blockquote>);
      return;
    }

    const isList = block.split("\n").every((line) => /^- /.test(line));
    if (isList) {
      const items = block.split("\n").map((line) => line.replace(/^- /, ""));
      out.push(
        <ul key={`ul${i}`}>
          {items.map((item, j) => (
            <li key={`li${j}`}>{renderInline(item)}</li>
          ))}
        </ul>,
      );
      return;
    }

    const text = block.replace(/\n/g, " ");
    out.push(<p key={`p${i}`}>{renderInline(text)}</p>);
  });

  return <>{out}</>;
}
