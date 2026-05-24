const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['nanoid'],
  webpack: (config) => {
    config.resolve.alias['yjs'] = path.resolve(__dirname, 'node_modules/yjs');
    return config;
  },
};

module.exports = nextConfig;
