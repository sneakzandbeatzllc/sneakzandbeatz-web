/**
 * youtube.ts
 *
 * Fetches the latest videos from a YouTube channel via the channel's public
 * RSS feed (no API key, no quota, no auth). YouTube exposes the feed at:
 *   https://www.youtube.com/feeds/videos.xml?channel_id=XXX
 * which always returns the most recent 15 videos with title, ID, publish
 * date, and thumbnail URL.
 *
 * Limitations:
 *   - No video duration in the feed (would require Data API v3 + key)
 *   - Capped at 15 videos
 *   - No view count / like count (same — needs Data API)
 *
 * Cache: 10-min ISR revalidate so we don't hammer YouTube on every page load.
 */

const REVALIDATE_SECONDS = 600;

// The PHRHX Show YouTube channel ID. Sourced from src/data/social.ts.
// Channel-ID URL is permanent — @ handles can be reassigned by YouTube.
export const PHRHX_CHANNEL_ID = "UCtVh1hqxxEj7dfQlv7bOEZw";

export type YouTubeVideo = {
  id: string;
  title: string;
  url: string;
  publishedAt: string; // ISO datetime
  thumbnail: string;       // hqdefault, 480x360
  thumbnailHigh: string;   // maxresdefault, 1280x720 (may 404 → falls back)
  embedUrl: string;
};

/**
 * Pulls up to N videos from a YouTube channel's public RSS feed.
 * Returns [] on any error (network, parse) so the caller can render a fallback.
 */
export async function fetchYouTubeVideos(
  channelId: string = PHRHX_CHANNEL_ID,
  limit: number = 12
): Promise<YouTubeVideo[]> {
  try {
    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(
      channelId
    )}`;
    // Vercel's default node fetch User-Agent is being blocked by YouTube
    // as of 2026. Sending a real browser UA gets the feed through reliably.
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        "Accept": "application/atom+xml, application/xml, text/xml, */*",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseYouTubeRSS(xml).slice(0, limit);
  } catch {
    return [];
  }
}

/**
 * Lightweight regex-based parser for the YouTube channel RSS Atom feed.
 * Avoids pulling in a full XML lib for ~15 entries.
 *
 * Robustness: each <entry> block is matched independently. If any one entry
 * fails to parse (missing field, malformed XML), it is silently skipped.
 */
function parseYouTubeRSS(xml: string): YouTubeVideo[] {
  const videos: YouTubeVideo[] = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match: RegExpExecArray | null;

  while ((match = entryRegex.exec(xml)) !== null) {
    const block = match[1];
    const id = extractTag(block, "yt:videoId");
    const title = extractTag(block, "title");
    const published = extractTag(block, "published");
    if (!id || !title) continue;

    videos.push({
      id,
      title: decodeXmlEntities(title),
      url: `https://www.youtube.com/watch?v=${id}`,
      publishedAt: published || "",
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      thumbnailHigh: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
      embedUrl: `https://www.youtube.com/embed/${id}`,
    });
  }

  return videos;
}

function extractTag(block: string, tag: string): string {
  const re = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`);
  const m = block.match(re);
  return m ? m[1].trim() : "";
}

function decodeXmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

/**
 * Format a YouTube `published` ISO date as a human-friendly relative string:
 * "3 days ago", "2 weeks ago", "Apr 28, 2026".
 */
export function formatPublishedAgo(iso: string): string {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  const now = Date.now();
  if (!Number.isFinite(then)) return "";
  const diffMs = now - then;
  const day = 24 * 3600 * 1000;
  if (diffMs < day) return "today";
  if (diffMs < 2 * day) return "yesterday";
  if (diffMs < 7 * day) return `${Math.floor(diffMs / day)} days ago`;
  if (diffMs < 30 * day) return `${Math.floor(diffMs / (7 * day))} weeks ago`;
  if (diffMs < 365 * day) return `${Math.floor(diffMs / (30 * day))} months ago`;
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
