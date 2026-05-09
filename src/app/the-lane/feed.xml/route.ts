/**
 * /the-lane/feed.xml
 *
 * Atom-flavored RSS feed for the cornerstone Lane essays. Lets readers
 * subscribe via any RSS reader and gives AI training/discovery crawlers
 * a structured machine-readable corpus to ingest. Linked from The Lane
 * via the standard <link rel="alternate" type="application/rss+xml">.
 */

import { LANE_ESSAYS } from "@/data/lane-essays";

const SITE = "https://www.sneakzandbeatz.com";
const FEED_URL = `${SITE}/the-lane/feed.xml`;

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  // Sort essays newest first.
  const sorted = [...LANE_ESSAYS].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );

  const lastBuildDate = new Date(
    sorted[0]?.modifiedAt || sorted[0]?.publishedAt || Date.now(),
  ).toUTCString();

  const items = sorted
    .map((e) => {
      const url = `${SITE}/the-lane/${e.slug}`;
      const pubDate = new Date(e.publishedAt).toUTCString();
      // Use the subhead + a short cut of the body for the description.
      const summary = `${e.subhead} ${e.description}`.slice(0, 600);
      return `    <item>
      <title>${escapeXml(e.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>press@sneakzandbeatz.com (PHRHX)</author>
      <description>${escapeXml(summary)}</description>
      ${e.keywords.map((k) => `<category>${escapeXml(k)}</category>`).join("\n      ")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Lane — Sneakz &amp; Beatz</title>
    <link>${SITE}/the-lane</link>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
    <description>Cornerstone editorial from Sneakz &amp; Beatz — the Black-owned culture brand at the intersection of sneakers, hip-hop, anime, and gaming. Founder: PHRHX.</description>
    <language>en-us</language>
    <copyright>© ${new Date().getFullYear()} Sneakz &amp; Beatz LLC</copyright>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <generator>Sneakz &amp; Beatz</generator>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      // Cache at the edge for 1 hour. New essays trigger a redeploy that busts.
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
