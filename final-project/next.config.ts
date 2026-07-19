import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "3tzcll5nx0wsgvwk.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "cdn.fashn.ai",
      },
    ],
  },
};

export default nextConfig;

