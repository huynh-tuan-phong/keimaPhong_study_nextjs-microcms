import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.microcms.io',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
