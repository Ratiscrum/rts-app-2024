import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

module.exports = {
  images: {
    domains: ['api.qrserver.com'],
  },
  transpilePackages: ['@wllama/wllama'],
  reactStrictMode: false,
  async headers() {
    return [
      {
        source: '/(.*)', // Appliquer à toutes les routes
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
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
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
