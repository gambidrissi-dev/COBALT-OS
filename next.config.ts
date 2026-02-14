import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Vos autres options ici */
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    reactCompiler: true,
  },
};

export default nextConfig;