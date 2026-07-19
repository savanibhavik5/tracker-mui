import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  transpilePackages: ["@react-jvectormap/core", "@react-jvectormap/world"],
  

  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
