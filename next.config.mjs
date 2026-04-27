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
};

export default nextConfig;
