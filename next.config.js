/** @type {import('next').NextConfig} */
const isGhPages = process.env.GITHUB_ACTIONS === 'true';
const basePath = isGhPages ? '/My-Website' : '';

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: isGhPages ? '/My-Website/' : '',
  images: {
    unoptimized: true,
  },
  // Lets client code prefix files in /public (CV, OG image) on GitHub Pages.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

module.exports = nextConfig;
