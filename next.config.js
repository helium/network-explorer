/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  experimental: {
    scrollRestoration: true,
    serverComponentsExternalPackages: ["knex"],
  },
  async redirects() {
    return [
      {
        source: "/((?!api).*)/:slug",
        destination: "https://world.helium.com",
        permanent: true,
      },
      {
        source: "/:slug",
        destination: "https://world.helium.com",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
