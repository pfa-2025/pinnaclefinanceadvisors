import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "pub-8eea5b6be6594b4fa65cde645234047b.r2.dev",
      },
    ],
  },
};

export default nextConfig;
