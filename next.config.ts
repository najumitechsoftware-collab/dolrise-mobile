import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 🔥 STABLE MODE (low memory)
  reactStrictMode: true,

  // ❌ Disable heavy features
  reactCompiler: false,

  // 🔥 Optional: reduce build load
  swcMinify: true,

  // 🔁 API proxy
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.dolrise.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
