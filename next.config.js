/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.ctfassets.net'],
  },
  reactStrictMode: true,
  eslint: {
    // don't auto lint during next build (we run it during CI otherwise)
    ignoreDuringBuilds: true,
  },
  publicRuntimeConfig: {
    gaTrackingId: process.env.GA_UA_ID ?? '',
    uniformProjectId: process.env.UNIFORM_PROJECT_ID,
  },
  serverRuntimeConfig: {
    uniformApiHost: process.env.UNIFORM_CLI_BASE_URL,
    uniformProjectId: process.env.UNIFORM_PROJECT_ID,
    uniformApiKey: process.env.UNIFORM_API_KEY,
  },
};

module.exports = nextConfig;
