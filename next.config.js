/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
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
    workerThreads: false,
  },
};

module.exports = nextConfig;
