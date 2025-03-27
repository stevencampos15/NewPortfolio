import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint error for production build to prevent deployment failures
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
