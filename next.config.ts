import type { NextConfig } from 'next';

module.exports = {
  images: {
    domains: ['api.qrserver.com'],
  },
  transpilePackages: ['@wllama/wllama'],
  reactStrictMode: false,
};

const nextConfig: NextConfig = {
  webpack(config) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
  sassOptions: {
    implementation: 'sass-embedded',
  },
};

export default nextConfig;
