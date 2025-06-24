import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com"],
  },
  typescript: {
    // This will allow you to run the Next.js app even if there are TypeScript errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
