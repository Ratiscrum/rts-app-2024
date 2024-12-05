import type { NextConfig } from 'next';

module.exports = {
  images: {
    domains: ['api.qrserver.com'],
  },
  transpilePackages: ['@wllama/wllama'],
};

const nextConfig: NextConfig = {
  webpack(config) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
};

export default nextConfig;
