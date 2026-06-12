/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // All resizing is delegated to the source CDNs (Shopify, Cloudinary,
    // Unsplash) via the custom loader — Vercel's optimizer and its monthly
    // quota are bypassed entirely.
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
  },
}
module.exports = nextConfig
