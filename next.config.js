/** @type {import('next').NextConfig} */
const isGhPages = process.env.GITHUB_ACTIONS === 'true';
const nextConfig = {
  output: 'export',
  basePath: isGhPages ? '/My-Website' : '',
  assetPrefix: isGhPages ? '/My-Website/' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
