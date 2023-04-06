/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  experimental: {
    appDir: true,
    scrollRestoration: true,
  },
}

module.exports = nextConfig
