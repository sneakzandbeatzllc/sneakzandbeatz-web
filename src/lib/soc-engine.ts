/**
 * soc-engine.ts
 *
 * Trending bar feed. In production, this reads the top-scored cycles from
 * the local SOC engine output (07_AUTOMATION_OS/05-state/cycles.json) so
 * the trending strip auto-updates with whatever the SOC scorer ranks today.
 *
 * Right now this returns a static fallback so the site renders before the
 * engine is wired up. Two integration paths:
 *
 *   A) Server-side at build time (recommended for production)
 *      - Vercel build runs your trend_ingest + soc_scorer + variant_generator
 *        scripts as a build step, dumps a static JSON into /public.
 *      - This file fetches /api/trending which reads that JSON.
 *      - Use ISR (export const revalidate = 600) to refresh every 10 minutes.
 *
 *   B) Push from the Mac SOC engine (recommended for local dev)
 *      - The local engine POSTs the latest top-N to a Vercel KV store or
 *        a webhook endpoint, this function reads from there.
 */

export type TrendingItem = { title: string; url?: string };

const FALLBACK: TrendingItem[] = [
  { title: "Air Jordan 5 White Metallic Returns This Saturday" },
  { title: "Drake & Future Tease Joint Album Sequel" },
  { title: "Jujutsu Kaisen Finale Special Confirmed for Summer" },
  { title: "Valorant Patch 9.7 Reworks Two Agents" },
  { title: "Air Jordan 4 Toro Bravo Returns With Updated Sample" },
  { title: "Chainsaw Man Reze Arc Movie PV Drops" },
];

export async function fetchTrending(): Promise<TrendingItem[]> {
  // TODO: replace with a real fetch when the SOC engine is exposed via API.
  // Example:
  //   const res = await fetch(process.env.SOC_ENGINE_URL + "/api/trending", { next: { revalidate: 600 } });
  //   if (!res.ok) return FALLBACK;
  //   const data = await res.json();
  //   return data.cycles.slice(0, 6).map((c: any) => ({ title: c.title, url: c.source_link }));
  return FALLBACK;
}
