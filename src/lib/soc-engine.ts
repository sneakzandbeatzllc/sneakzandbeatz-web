/**
 * soc-engine.ts
 *
 * Trending bar feed — two-tier source strategy:
 *
 *   1) PRIMARY: /ticker.json — produced by the local SOC engine running
 *      on the operator's Mac (cron'd at 6 AM PT). The engine ingests RSS,
 *      scores trends with the explainable SOC scorer, dedupes, and writes
 *      a slim payload to public/ticker.json. The engine commits + pushes,
 *      Vercel rebuilds, and this file picks up the latest cycles.
 *
 *      This is the high-quality path: scored + deduped + ranked, pillar-
 *      interleaved output of the engine, the same data the editor team
 *      actually works from.
 *
 *   2) FALLBACK: live RSS via fetch — runs only if ticker.json is missing
 *      OR is older than MAX_PAYLOAD_AGE_HOURS (engine hasn't run today,
 *      Mac is off, etc.). Pulls 8 sources directly with a 5-minute ISR
 *      cache. Same denylist as the engine to keep deal/gift-guide junk
 *      out.
 *
 * Edit the engine's selection rules in:
 *     07_AUTOMATION_OS/build_site_payload.py
 * Edit the RSS fallback feeds in the FEEDS array below.
 */

export type TrendingItem = { title: string; url?: string };

const MAX_PAYLOAD_AGE_HOURS = 36;

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
  // GAMING — Polygon + Kotaku are editorial culture coverage (NOT
  // affiliate-deal aggregators). Do not add commerce-heavy feeds here.
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
  // 1) Try the SOC engine payload first.
  const engineItems = await fetchFromEnginePayload();
  if (engineItems && engineItems.length > 0) return engineItems;

  // 2) Fall back to live RSS (engine hasn't run today / payload is stale).
  const results = await Promise.all(FEEDS.map(fetchFeedSafe));
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

/**
 * Read public/ticker.json (statically served by Vercel from the repo).
 * Returns null if the file is missing, malformed, empty, or older than
 * MAX_PAYLOAD_AGE_HOURS — the caller will then fall back to live RSS.
 */
type EnginePayload = {
  schema?: number;
  generated_utc?: string;
  source?: string;
  items?: Array<{ title?: string; url?: string; pillar?: string; score?: number }>;
};

async function fetchFromEnginePayload(): Promise<TrendingItem[] | null> {
  try {
    // Use a relative URL — Vercel serves /ticker.json from /public.
    // We pass a cache-busting query string via revalidate so updates
    // propagate within 5 minutes of a git push.
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://www.sneakzandbeatz.com");
    const res = await fetch(`${baseUrl}/ticker.json`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as EnginePayload;

    if (!data || !Array.isArray(data.items) || data.items.length === 0) return null;

    // Reject stale payloads — the engine should run daily; if the file's
    // older than the threshold the Mac was probably off and we should
    // surface live RSS instead of yesterday's cycles.
    if (data.generated_utc) {
      const ageMs = Date.now() - new Date(data.generated_utc).getTime();
      if (Number.isFinite(ageMs) && ageMs > MAX_PAYLOAD_AGE_HOURS * 3600 * 1000) {
        return null;
      }
    }

    return data.items
      .filter((it) => it && typeof it.title === "string" && it.title.length > 0)
      .slice(0, MAX_HEADLINES)
      .map((it) => ({ title: it.title as string, url: it.url || undefined }));
  } catch {
    return null;
  }
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
