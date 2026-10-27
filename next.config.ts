import type { NextConfig } from "next";

const isExport = !!process.env.STATIC_EXPORT;

const nextConfig: NextConfig = {
  output: isExport ? "export" : undefined,
  images: { unoptimized: isExport, remotePatterns: [{ protocol: "https", hostname: "upload.wikimedia.org" }] },
  trailingSlash: isExport,
  cacheComponents: !isExport,
  partialPrefetching: !isExport,
  turbopack: {
    rules: { "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" } },
  },
};

export default nextConfig;
