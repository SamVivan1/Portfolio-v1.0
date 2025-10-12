import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "inxignia-admin.soi.asia",
      "digitalent.komdigi.go.id",
      "i.scdn.co", // Spotify album art
    ],
    unoptimized: false,
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    minimumCacheTTL: 60,
  },
  eslint: {
    ignoreDuringBuilds: true, // <--- tambahkan ini
  },
  typescript: {
    ignoreBuildErrors: true, // opsional kalau ada type error
  },
};

export default nextConfig;
