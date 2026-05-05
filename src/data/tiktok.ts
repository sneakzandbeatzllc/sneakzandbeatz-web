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
  // Pulled from @SneakzandBeatzOfficial's 3 pinned videos
  // (the user's signature shelf — rotate when they re-pin).
  {
    id: "7634635822251183374",
    caption: "Drake — smooth to savage in seconds.",
  },
  {
    id: "7635657877922811149",
    caption: "Stealth mode with a twist. That 'PEEL OFF' detail is tough.",
  },
  {
    id: "7634286614184758541",
    caption: "",
  },
];

/** Profile URL — used for placeholder tiles + the "Follow" CTA. */
export const TIKTOK_PROFILE_URL = SOCIAL.tiktok.url;
export const TIKTOK_HANDLE = SOCIAL.tiktok.handle;
