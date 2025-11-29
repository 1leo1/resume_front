import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Replit proxy compatibility - allow all hosts
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ]
  },
};

export default nextConfig;
