/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/(.*)',           // Matches every route
        destination: 'https://world.helium.com',
        permanent: true,            // Use a 301 permanent redirect
      },
    ]
  },
}

module.exports = nextConfig
