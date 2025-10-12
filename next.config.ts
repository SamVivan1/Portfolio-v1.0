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
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // <--- tambahkan ini
  },
  typescript: {
    ignoreBuildErrors: true, // opsional kalau ada type error
  },
};

export default nextConfig;
