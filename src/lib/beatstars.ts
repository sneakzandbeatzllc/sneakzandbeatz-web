/**
 * beatstars.ts
 *
 * Featured beats for the homepage Beat Store row. Beatstars exposes producer
 * catalog data via their JSON API once you have a producer account.
 *
 * Until your Beatstars account is provisioned, this returns a hand-curated
 * list of 3 featured beats so the homepage renders. Real wiring:
 *
 *   const res = await fetch(`https://www.beatstars.com/api/profile/sneakzbeatz/beats?featured=1&limit=3`, {
 *     next: { revalidate: 3600 }, // refresh hourly
 *   });
 *   if (!res.ok) return FALLBACK;
 *   return res.json();
 *
 * Beatstars also offers an embed widget (iframe) for the full catalog.
 * That goes on /beatstore (the dedicated catalog route) — not here.
 */

export type Beat = {
  id: string;
  name: string;
  bpm: number;
  key: string;
  style: string;
  priceUSD: number;
  licenseLabel: string;
  previewUrl?: string;
  buyUrl?: string;
};

const FALLBACK: Beat[] = [
  { id: "midnight-run",     name: "Midnight Run",     bpm: 158, key: "G Minor", style: "Trap",     priceUSD: 49.99, licenseLabel: "Lease · MP3 + WAV" },
  { id: "no-turning-back",  name: "No Turning Back",  bpm: 142, key: "D Minor", style: "Drill",    priceUSD: 49.99, licenseLabel: "Lease · MP3 + WAV" },
  { id: "bloodline",        name: "Bloodline",        bpm: 160, key: "C Minor", style: "Detroit",  priceUSD: 49.99, licenseLabel: "Lease · MP3 + WAV" },
];

export async function fetchFeaturedBeats(): Promise<Beat[]> {
  // TODO: replace with real Beatstars catalog fetch when the producer account is set up.
  return FALLBACK;
}
