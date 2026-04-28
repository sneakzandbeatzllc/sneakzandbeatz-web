/**
 * soc-cycles.ts
 *
 * Reads the per-pillar JSON payloads written by 07_AUTOMATION_OS/
 * build_site_payload.py. The LaunchAgent regenerates these at 6 AM PT
 * daily; the website reads them server-side with 5-min ISR.
 *
 * Files served from /public:
 *   - /pillar-sneakers.json
 *   - /pillar-hiphop.json
 *   - /pillar-anime.json
 *   - /pillar-gaming.json
 *   - /culture-mix.json   (cross-pillar top-6 for the homepage fallback)
 */

export type PillarCycle = {
  title: string;
  url: string;
  pillar: "sneakers" | "hiphop" | "anime" | "gaming" | "";
  score: number;
  excerpt: string;
  platform?: string;
};

const REVALIDATE_SECONDS = 300;
const MAX_PAYLOAD_AGE_HOURS = 36;

type Payload = {
  schema?: number;
  generated_utc?: string;
  source?: string;
  pillar?: string;
  items?: PillarCycle[];
};

function baseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://www.sneakzandbeatz.com")
  );
}

async function loadPayload(filename: string): Promise<PillarCycle[]> {
  try {
    const res = await fetch(`${baseUrl()}/${filename}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as Payload;
    if (!data || !Array.isArray(data.items)) return [];

    if (data.generated_utc) {
      const ageMs = Date.now() - new Date(data.generated_utc).getTime();
      if (Number.isFinite(ageMs) && ageMs > MAX_PAYLOAD_AGE_HOURS * 3600 * 1000) {
        return []; // stale — let the page hide / fall back
      }
    }
    return data.items.filter((it) => it && it.title && it.url);
  } catch {
    return [];
  }
}

export function fetchPillarCycles(
  pillar: "sneakers" | "hiphop" | "anime" | "gaming"
): Promise<PillarCycle[]> {
  return loadPayload(`pillar-${pillar}.json`);
}

export function fetchCultureMix(): Promise<PillarCycle[]> {
  return loadPayload("culture-mix.json");
}
