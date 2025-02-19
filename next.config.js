/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        // Redirect all routes that don't start with /api
        source: '/((?!api).*)',
        destination: 'https://world.helium.com',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
