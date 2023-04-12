/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  experimental: {
    appDir: true,
    scrollRestoration: true,
  },
  async redirects() {
    return [
      {
        source: "/hotspots/hex/:index",
        destination: "/hex/:index",
        permanent: false,
      },
      {
        source: "/iot/hex/:index",
        destination: "/hex/:index",
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
