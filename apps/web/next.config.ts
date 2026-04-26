import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
  transpilePackages: ["@workspace/ui"],
};

export default nextConfig;
