/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    jwtTokenKey: "JWTToken",
  },
};

module.exports = nextConfig;
