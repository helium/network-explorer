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
      {
        source: "/hotspots/:address/activity",
        destination: "/hotspots/:address",
        permanent: false,
      },
      {
        source: "/hotspots/:address/witnessed",
        destination: "/hotspots/:address",
        permanent: false,
      },
      {
        source: "/hotspots/:address/nearby",
        destination: "/hotspots/:address",
        permanent: false,
      },
      {
        source: "/market",
        destination: "/stats",
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
