import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['*'],
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
  async rewrites() {
    let apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    if (apiUrl.endsWith('/')) {
      apiUrl = apiUrl.slice(0, -1);
    }
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/:path*`,
      },
    ]
  },
};

export default nextConfig;
