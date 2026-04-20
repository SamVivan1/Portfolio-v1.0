import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "inxignia-admin.soi.asia",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "digitalent.komdigi.go.id",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: "/**",
      },
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

