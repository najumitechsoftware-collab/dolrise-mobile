/** @type {import('next').NextConfig} */

const isExport = process.env.EXPORT === "true";

const nextConfig = {
  reactStrictMode: true,

  // 🔥 Only enable export when explicitly needed (for Capacitor)
  ...(isExport && {
    output: "export",
  }),

  images: {
    // ⚠️ required only for export mode
    unoptimized: true,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dolrise.com",
      },
      {
        protocol: "https",
        hostname: "pub-303974546ee54162b784279025de217d.r2.dev",
      },
    ],
  },

  experimental: {
    workerThreads: false, // 💥 reduce memory usage during build
  },
};

module.exports = nextConfig;
