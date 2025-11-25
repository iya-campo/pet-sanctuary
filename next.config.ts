import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
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
    domains: ['raw.githubusercontent.com'],
    loader: 'akamai',
    path: '',
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: '/pet-sanctuary',
};

export default nextConfig;
