/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow remote IG image hosts when we wire up the From-the-Culture grid.
  images: {
    remotePatterns: [
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
      { source: "/articles", destination: "/the-lane", permanent: true },
      { source: "/articles/:path*", destination: "/the-lane", permanent: true },
    ];
  },
};

export default nextConfig;
