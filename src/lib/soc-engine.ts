/**
 * soc-engine.ts
 *
 * Trending bar feed — pulls LIVE headlines from RSS sources covering each of
 * our four pillars (sneakers, hip-hop, anime, gaming).
 *
 * Refreshed on the server every 5 minutes (Next.js ISR via fetch's
 * `next.revalidate`). If a feed fails or the network is offline, that pillar
 * is silently skipped — we only fall back to the static stub if literally
 * every feed failed.
 *
 * RSS is parsed with a tiny regex shim (no external deps) so this stays
 * fast at the edge. We strip CDATA, decode the common HTML entities, and
 * limit each item to a reasonable headline length.
 *
 * To swap any source: edit the FEEDS array below. Each pillar contributes
 * up to 2 headlines; the final ticker shows up to 8 items, interleaved
 * across pillars in the order listed.
 */

export type TrendingItem = { title: string; url?: string };

const FEEDS: { url: string; pillar: string }[] = [
  // SNEAKERS — culture/release news only (no commerce sections).
  { url: "https://hypebeast.com/footwear/feed",          pillar: "Sneakers" },
  { url: "https://sneakernews.com/feed/",                pillar: "Sneakers" },
  // HIP-HOP — news + culture.
  { url: "https://hiphopdx.com/rss/news",                pillar: "Hip-Hop"  },
  { url: "https://www.xxlmag.com/feed/",                 pillar: "Hip-Hop"  },
  // ANIME — culture-focused outlets.
  { url: "https://www.animenewsnetwork.com/all/rss.xml", pillar: "Anime"    },
  { url: "https://www.crunchyroll.com/news/rss",         pillar: "Anime"    },
  // GAMING — explicitly avoid IGN/feedburner because they include deals,
  // gift guides, and Amazon affiliate listicles. Polygon + Kotaku are
  // editorial culture coverage.
  { url: "https://www.polygon.com/rss/index.xml",        pillar: "Gaming"   },
  { url: "https://kotaku.com/rss",                       pillar: "Gaming"   },
];

/**
 * Hard-denylist for headlines. We drop any title that matches ANY of these
 * patterns before it can appear in the ticker. This catches the deal/gift-
 * guide/affiliate junk that occasionally leaks through editorial RSS feeds
 * (Mother's Day gift roundups, "Save 50% off X" listicles, "Best Buy/Prime
 * Day" deals, etc.).
 */
const TITLE_DENYLIST: RegExp[] = [
  /\bdeal[s]?\b/i,
  /\b\d+%\s*off\b/i,
  /\bsave\s+(?:\$|up to|big)/i,
  /\bgift\s*(?:idea[s]?|guide[s]?)\b/i,
  /\b(?:mother|father)'?s day\b/i,
  /\bvalentine'?s day\b/i,
  /\bblack friday\b/i,
  /\bcyber monday\b/i,
  /\bprime day\b/i,
  /\b(?:discount|coupon)\b/i,
  /\bbest\s+(?:buy|deal[s]?)\b/i,
  /\bamazon prime\b/i,
  /\bbudget\s+(?:pick|buy|option)\b/i,
  /\baffordable\b/i,
  /\bunder\s+\$\d+/i,
  /\bcheapest\b/i,
  /\bsponsored\b/i,
  /\b(?:promo code|coupon code)\b/i,
];

const FALLBACK: TrendingItem[] = [
  { title: "New drops from Sneakz & Beatz — fresh beats every week" },
  { title: "Browse the catalog: 96 mastered beats, MP3 + WAV, instant delivery" },
  { title: "Bundle deal: 100 beats + stems + mix pack — $79 today" },
  { title: "Subscribe to The PHRHX Show on Substack for early access" },
];

const ITEMS_PER_FEED = 2;
const MAX_HEADLINES = 8;
const FETCH_TIMEOUT_MS = 4000;

export async function fetchTrending(): Promise<TrendingItem[]> {
  const results = await Promise.all(FEEDS.map(fetchFeedSafe));
  // Interleave: take items[0] from each pillar first, then items[1], etc.
  const interleaved: TrendingItem[] = [];
  for (let i = 0; i < ITEMS_PER_FEED; i++) {
    for (const list of results) {
      if (list[i]) interleaved.push(list[i]);
      if (interleaved.length >= MAX_HEADLINES) break;
    }
    if (interleaved.length >= MAX_HEADLINES) break;
  }
  return interleaved.length > 0 ? interleaved : FALLBACK;
}

async function fetchFeedSafe(feed: { url: string; pillar: string }): Promise<TrendingItem[]> {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
    const res = await fetch(feed.url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SneakzAndBeatz/1.0; +https://sneakzandbeatz.com)",
        Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml, */*",
      },
      signal: ctrl.signal,
      next: { revalidate: 300 }, // ISR — refresh every 5 minutes
    });
    clearTimeout(timer);
    if (!res.ok) return [];
    const xml = await res.text();
    // Pull more items than we need, then filter the deal/gift-guide junk
    // before trimming back to ITEMS_PER_FEED. This way a feed whose first
    // 2 items happen to be commerce listicles still contributes its real
    // editorial pieces.
    const raw = parseFeedItems(xml, 10);
    return raw
      .filter((item) => !TITLE_DENYLIST.some((re) => re.test(item.title)))
      .slice(0, ITEMS_PER_FEED);
  } catch {
    return [];
  }
}

/** Parse <item> (RSS) or <entry> (Atom) blocks and pull title + link. */
function parseFeedItems(xml: string, limit: number): TrendingItem[] {
  const out: TrendingItem[] = [];
  const blocks: string[] = [];

  const itemRe = /<item\b[^>]*>([\s\S]*?)<\/item>/g;
  let m: RegExpExecArray | null;
  while ((m = itemRe.exec(xml))) blocks.push(m[1]);

  if (blocks.length === 0) {
    const entryRe = /<entry\b[^>]*>([\s\S]*?)<\/entry>/g;
    while ((m = entryRe.exec(xml))) blocks.push(m[1]);
  }

  for (const block of blocks) {
    if (out.length >= limit) break;
    const titleMatch = /<title[^>]*>([\s\S]*?)<\/title>/.exec(block);
    if (!titleMatch) continue;
    const title = sanitize(titleMatch[1]);
    if (!title || title.length < 8 || title.length > 140) continue;

    let url: string | undefined;
    // RSS: <link>https://...</link>
    const linkText = /<link[^>]*>([^<]+)<\/link>/.exec(block);
    if (linkText && /^https?:\/\//.test(linkText[1].trim())) {
      url = linkText[1].trim();
    } else {
      // Atom: <link href="..." />
      const linkAttr = /<link[^>]*\bhref=["']([^"']+)["']/.exec(block);
      if (linkAttr) url = linkAttr[1].trim();
    }

    out.push({ title, url });
  }

  return out;
}

function sanitize(raw: string): string {
  let t = raw.trim();
  // Strip CDATA wrappers (handles whole and partial)
  t = t.replace(/<!\[CDATA\[/g, "").replace(/\]\]>/g, "").trim();
  // Strip any inline HTML tags (some feeds embed <b>, <em>, etc.)
  t = t.replace(/<[^>]+>/g, "");
  // Decode the entities most likely to appear in headlines
  t = t
    .replace(/&amp;/g, "&")
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&#0?34;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&hellip;/g, "…")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8212;/g, "—")
    .replace(/&#8211;/g, "–")
    .replace(/\s+/g, " ");
  return t.trim();
}
