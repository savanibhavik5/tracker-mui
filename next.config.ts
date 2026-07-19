import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  transpilePackages: [
    "@react-jvectormap/core",
    "@react-jvectormap/world",
  ],
   allowedDevOrigins: [
    "192.168.1.151",
  ],

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