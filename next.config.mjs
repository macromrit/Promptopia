/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ No need to keep this under 'experimental' for Next.js 15
  serverExternalPackages: ["mongoose"],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },

  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

export default nextConfig;
