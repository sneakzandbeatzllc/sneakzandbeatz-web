// Live Discord invite. The old invite (4B6v3DyY) was found INVALID on 2026-09-10.
// Create a new one (Server → Invite People → Edit link → Expire: Never, Max uses: No limit)
// and paste it here. Every Discord link on the site points at /discord → this URL.
const DISCORD_INVITE = "https://discord.gg/4B6v3DyY"; // <-- REPLACE with the new permanent invite

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow remote IG image hosts when we wire up the From-the-Culture grid.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "https", hostname: "*.cdninstagram.com" },
      { protocol: "https", hostname: "*.fbcdn.net" },
      { protocol: "https", hostname: "scontent-*.cdninstagram.com" },
    ],
  },
  // Permanent redirects for the retired AI-article system. Sneakz does not
  // publish AI-generated articles. /articles and /articles/{pillar}/{slug}
  // now route to the editorial home at /the-lane. Preserves any inbound
  // SEO signal that may have already been earned by those URLs.
  async redirects() {
    return [
      // Merch merged into the single Shop page (2026-06-21).
      { source: "/merch", destination: "/shop", permanent: true },
      // Single point of truth for the Discord invite (see DISCORD_INVITE above).
      { source: "/discord", destination: DISCORD_INVITE, permanent: false },
      { source: "/articles", destination: "/the-lane", permanent: true },
      { source: "/articles/:path*", destination: "/the-lane", permanent: true },
      // Retired Lane essay — the "four-pillar reader" piece was pulled
      // 2026-06-04 per a brand-positioning decision. Any inbound links
      // (search engines, social shares, AI citations) route to the
      // editorial home so they don't 404.
      {
        source: "/the-lane/four-pillar-reader",
        destination: "/the-lane",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
