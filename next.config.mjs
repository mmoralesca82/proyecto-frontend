/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'robohash.org'
        }
      ]
    }
  };
  
  module.exports = {
    experimental: {
      missingSuspenseWithCSRBailout: false,
    },
  }

  export default nextConfig;
  
  