/**
 * render-md.tsx
 *
 * Tiny server-side markdown renderer for Lane essays. Supports the subset
 * of Markdown the essays actually use:
 *
 *   - `## Heading` → <h2>
 *   - paragraphs (blank-line separated)
 *   - `**bold**` and `*italic*`
 *   - `[link text](url)` — opens external in new tab
 *   - `- item` lists
 *   - `---` horizontal rule
 *   - `> quote` blockquote
 *
 * No code blocks, no tables, no images — those aren't in the essays. If
 * you add an essay that needs them, extend this file rather than pulling
 * in a full markdown library (this codebase has stayed dep-light on purpose).
 */

import React from "react";

// Inline transforms — order matters. Bold has to come before italic so
// **a** doesn't get parsed as *<em>a</em>*.
function renderInline(text: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  let buf = text;
  let key = 0;

  // Eat one match at a time, left to right.
  // Pattern matches: bold | italic | link
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

export function renderMarkdown(src: string): React.ReactNode {
  // Split into blocks separated by blank lines (one or more).
  const blocks = src.split(/\n\s*\n/).map((b) => b.replace(/^\s+|\s+$/g, ""));
  const out: React.ReactNode[] = [];

  blocks.forEach((block, i) => {
    if (!block) return;

    // Horizontal rule
    if (/^---+$/.test(block)) {
      out.push(<hr key={`hr${i}`} />);
      return;
    }

    // Heading
    const h2 = block.match(/^## (.+)$/);
    if (h2) {
      out.push(<h2 key={`h${i}`}>{renderInline(h2[1])}</h2>);
      return;
    }

    // Blockquote — supports multi-line, each line starts with >
    if (/^> /.test(block)) {
      const inner = block
        .split("\n")
        .map((line) => line.replace(/^> ?/, ""))
        .join(" ");
      out.push(
        <blockquote key={`bq${i}`}>{renderInline(inner)}</blockquote>,
      );
      return;
    }

    // Bullet list — every line starts with `- `
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

    // Default — paragraph (joining wrapped lines into one)
    const text = block.replace(/\n/g, " ");
    out.push(<p key={`p${i}`}>{renderInline(text)}</p>);
  });

  return <>{out}</>;
}
