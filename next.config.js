/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.vox-cdn.com','media.lesechos.com'],
  },
};

module.exports = nextConfig;
