/** @type {import('next').NextConfig} */
const constant = require('./config/constant.ts');
const isProd = process.env.NODE_ENV === 'production';

const basePath = isProd ? constant.basePath : '';

const nextConfig = {
  output: 'export',
  assetPrefix: basePath,
  basePath: basePath,
  trailingSlash: true,
  eslint: {
    dirs: ['src'],
  },
};

module.exports = nextConfig;
