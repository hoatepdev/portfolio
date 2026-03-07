import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
  transpilePackages: ["@workspace/ui"],
};

export default nextConfig;
