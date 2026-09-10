/**
 * social.ts
 *
 * Single source of truth for the brand's social handles + profile URLs.
 *
 * Important: the canonical handle on each platform is NOT the same string
 * because @sneakzandbeatz was either taken or locked on most platforms.
 * Pages reference these by name so a future rename only happens here.
 *
 *   - Instagram: @sneakz_beatz (underscore — canonical was taken)
 *   - X:         @sneakzandbeatz (got the canonical)
 *   - YouTube:   "The PHRHX Show" channel — channel-ID URL is more
 *                stable than @ handles, so we link via /channel/{id}
 *   - TikTok:    SneakzandBeatzOfficial (added "Official" — canonical was taken)
 *   - Threads:   reserved for the future S&B Girls UGC roster — not live yet
 *   - Substack:  sneakzandbeatz.substack.com
 */

export const SOCIAL = {
  instagram: {
    handle: "@sneakz_beatz",
    url: "https://instagram.com/sneakz_beatz",
    label: "IG",
  },
  tiktok: {
    handle: "@SneakzandBeatzOfficial",
    url: "https://tiktok.com/@SneakzandBeatzOfficial",
    label: "TT",
  },
  x: {
    handle: "@sneakzandbeatz",
    url: "https://x.com/sneakzandbeatz",
    label: "X",
  },
  youtube: {
    handle: "The PHRHX Show",
    // Channel-ID URL is permanent — @ handles can be reassigned by YT.
    url: "https://www.youtube.com/channel/UCtVh1hqxxEj7dfQlv7bOEZw",
    label: "YT",
  },
  threads: {
    handle: "S&B Girls — coming soon",
    url: "", // empty until S&B Girls roster launches
    label: "TH",
    enabled: false,
  },
  substack: {
    handle: "sneakzandbeatz.substack.com",
    url: "https://sneakzandbeatz.substack.com",
    label: "Substack",
  },
  discord: {
    handle: "Sneakz & Beatz Community",
    // 2026-09-10: the old invite (discord.gg/4B6v3DyY) went INVALID. All links now
    // go through /discord, which 301s to the live invite set in next.config.mjs
    // (DISCORD_INVITE). To rotate: create a new invite (Never expire, no max uses)
    // and change ONE line in next.config.mjs — nothing else on the site changes.
    url: "https://www.sneakzandbeatz.com/discord",
    label: "Discord",
    enabled: true,
  },
} as const;
