import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  images: { 
    domains: ['localhost', 'pet-sanctuary.vercel.app'],
  },
  eslint: {
    ignoreDuringBuilds: true, // temp
  },
};

export default nextConfig;
