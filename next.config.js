// next.config.js - Next.js Configuration
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    styledComponents: true
  },
  // Enable styled-jsx
  compiler: {
    styledJsx: true
  }
}

module.exports = nextConfig