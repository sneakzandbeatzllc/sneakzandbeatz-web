/**
 * substack.ts
 *
 * Two responsibilities:
 *   1) RSS reader — pulls recent posts from sneakzandbeatz.substack.com via
 *      the public RSS feed. Used by the homepage "From The Culture" block
 *      and the pillar pages "Latest From The Newsletter" sections.
 *   2) Subscribe stub — placeholder for the newsletter signup flow.
 */

// =============================================================================
// 1) RSS READER
// =============================================================================

export type SubstackPost = {
  title: string;
  url: string;
  excerpt: string;
  publishedAt: string; // ISO 8601
  imageUrl?: string;
  tags: string[];
  /** Best-guess pillar from tags + title keywords. May be null. */
  pillar: "sneakers" | "hiphop" | "anime" | "gaming" | null;
};

const FEED_URL = "https://sneakzandbeatz.substack.com/feed";
const FETCH_TIMEOUT_MS = 4000;
const REVALIDATE_SECONDS = 300;

const PILLAR_KEYWORDS: Record<NonNullable<SubstackPost["pillar"]>, RegExp[]> = {
  sneakers: [/\bsneaker/i, /\bjordan/i, /\bnike/i, /\badidas/i, /\bnew balance\b/i, /\bnb \d+/i, /\baf1\b/i, /\byeezy/i, /\bdrop\b/i, /\bcolorway/i, /\breleas/i],
  hiphop:   [/\bhip[- ]?hop/i, /\brap\b/i, /\bdrake/i, /\bkendrick/i, /\bcarti/i, /\bj\.? cole/i, /\btravis scott/i, /\bxxl/i, /\balbum/i, /\bsingle\b/i, /\bproducer/i, /\bbeat\b/i],
  anime:    [/\banime/i, /\bmanga/i, /\bcrunchyroll/i, /\bjujutsu/i, /\bdemon slayer/i, /\bone piece/i, /\bnaruto/i, /\bchainsaw man/i, /\bpokemon/i],
  gaming:   [/\bgaming/i, /\bvalorant/i, /\bps5\b/i, /\bxbox/i, /\bnintendo/i, /\bgame\b/i, /\bsteam\b/i, /\bfortnite/i, /\bcall of duty\b/i, /\bcod\b/i, /\belden ring/i, /\bgta\b/i, /\bhelldivers/i, /\barc raiders/i, /\bfinal fantasy/i, /\bresident evil/i],
};

export async function fetchSubstackPosts(limit = 6): Promise<SubstackPost[]> {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
    const res = await fetch(FEED_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SneakzAndBeatz/1.0; +https://sneakzandbeatz.com)",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      signal: ctrl.signal,
      next: { revalidate: REVALIDATE_SECONDS },
    });
    clearTimeout(timer);
    if (!res.ok) return [];
    const xml = await res.text();
    return parsePosts(xml).slice(0, limit);
  } catch {
    return [];
  }
}

/**
 * Pull only posts that match a pillar (by tag OR keyword). Used by the
 * pillar pages so /sneakers shows sneaker posts, /hiphop shows hip-hop, etc.
 * Falls back to keyword matching when posts aren't tagged.
 */
export async function fetchSubstackPostsForPillar(
  pillar: NonNullable<SubstackPost["pillar"]>,
  limit = 3
): Promise<SubstackPost[]> {
  const all = await fetchSubstackPosts(24);
  return all.filter((p) => p.pillar === pillar).slice(0, limit);
}

function parsePosts(xml: string): SubstackPost[] {
  const out: SubstackPost[] = [];
  const itemRe = /<item\b[^>]*>([\s\S]*?)<\/item>/g;
  let m: RegExpExecArray | null;
  while ((m = itemRe.exec(xml))) {
    const block = m[1];

    const title       = sanitize(pluck(block, "title"));
    const url         = sanitize(pluck(block, "link"));
    const description = sanitize(pluck(block, "description"));
    const pubDate     = sanitize(pluck(block, "pubDate"));

    if (!title || !url) continue;

    const tags: string[] = [];
    const catRe = /<category[^>]*>([\s\S]*?)<\/category>/g;
    let cm: RegExpExecArray | null;
    while ((cm = catRe.exec(block))) tags.push(sanitize(cm[1]));

    let imageUrl: string | undefined;
    const enclosure = /<enclosure[^>]*url=["']([^"']+)["'][^>]*\/?\s*>/.exec(block);
    if (enclosure) imageUrl = enclosure[1];
    if (!imageUrl) {
      const media = /<media:(?:content|thumbnail)[^>]*url=["']([^"']+)["'][^>]*\/?\s*>/.exec(block);
      if (media) imageUrl = media[1];
    }

    const excerpt = description.replace(/<[^>]+>/g, "").trim().slice(0, 240);

    let publishedAt = "";
    if (pubDate) {
      const d = new Date(pubDate);
      if (!isNaN(d.getTime())) publishedAt = d.toISOString();
    }

    out.push({
      title,
      url,
      excerpt,
      publishedAt,
      imageUrl,
      tags,
      pillar: detectPillar(title, tags),
    });
  }
  return out;
}

function pluck(block: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`);
  const m = re.exec(block);
  return m ? m[1] : "";
}

function sanitize(raw: string): string {
  let t = raw.trim();
  t = t.replace(/<!\[CDATA\[/g, "").replace(/\]\]>/g, "").trim();
  t = t.replace(/<[^>]+>/g, "");
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

function detectPillar(title: string, tags: string[]): SubstackPost["pillar"] {
  const haystack = [title, ...tags].join(" ");
  for (const [pillar, regexes] of Object.entries(PILLAR_KEYWORDS) as Array<
    [NonNullable<SubstackPost["pillar"]>, RegExp[]]
  >) {
    if (regexes.some((r) => r.test(haystack))) return pillar;
  }
  return null;
}

// =============================================================================
// 2) SUBSCRIBE STUB
// =============================================================================

export async function subscribeToSubstack(email: string): Promise<{ ok: boolean }> {
  // TODO: replace with a Vercel Edge Function that proxies to Substack's
  // subscribe endpoint. For now this is a no-op stub.
  if (!email || !email.includes("@")) throw new Error("invalid email");
  console.log(`[stub] would subscribe ${email} to Substack`);
  return { ok: true };
}
