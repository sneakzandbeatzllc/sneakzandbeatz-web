/**
 * tiktok.ts
 *
 * Pinned TikTok video IDs for the homepage <TikTokFeed /> reel.
 *
 * TikTok has no public RSS / oEmbed-list API for a user, so we curate
 * the homepage shelf manually here. To rotate the shelf:
 *
 *   1. Open the TikTok video on tiktok.com
 *   2. Copy the long numeric ID from the URL:
 *        https://www.tiktok.com/@SneakzandBeatzOfficial/video/1234567890123456789
 *                                                            ^^^^^^^^^^^^^^^^^^^
 *   3. Paste it into PINNED_VIDEOS below as a string. Order = display order.
 *   4. Caption is optional — shown under the embed for context. Leave "" if
 *      you want the embed to speak for itself.
 *   5. Push to main; Vercel rebuilds and the homepage reel updates.
 *
 * Empty list → component renders 3 placeholder tiles linking to the
 * TikTok profile so the homepage is never bare.
 */

import { SOCIAL } from "./social";

export type PinnedTikTok = {
  id: string;          // numeric TikTok video ID
  caption?: string;    // optional short caption under the embed
};

/**
 * Curated reel for the homepage. Order matters — first video shows first.
 * Best practice: 3-6 videos. More than 6 hurts page load (each TikTok
 * embed pulls a heavy iframe).
 */
export const PINNED_VIDEOS: PinnedTikTok[] = [
  // Most-viewed first — pulled from the TikTok "Popular" sort on 2026-06-21.
  // Re-pull from tiktok.com/@SneakzandBeatzOfficial (Popular tab) to refresh.
  {
    id: "7650994261726465293", // 6.2M views
    caption: "Lil Uzi sends North West a “Hello Northyyy” 👀",
  },
  {
    id: "7650972569608277261", // 98.6K views
    caption: "50 Cent playing Drake’s “Broke Boys” — what’s going on here?",
  },
  {
    id: "7634635822251183374", // 52.1K views
    caption: "",
  },
  {
    id: "7635053007721270542",
    caption: "",
  },
  {
    id: "7635011893551172878",
    caption: "",
  },
  {
    id: "7635005544402668813",
    caption: "",
  },
];

/** Profile URL — used for placeholder tiles + the "Follow" CTA. */
export const TIKTOK_PROFILE_URL = SOCIAL.tiktok.url;
export const TIKTOK_HANDLE = SOCIAL.tiktok.handle;
