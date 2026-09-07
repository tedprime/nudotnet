import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      // Admin photo uploads (staff, projects, hero images, etc.) go straight
      // through Server Actions as FormData, so they're subject to this limit.
      // Next's default is 1mb, which a typical phone/camera photo exceeds —
      // that shows up to the browser as a bare "Failed to fetch" on submit.
      bodySizeLimit: '10mb',
    },
  },
  images: {
    loader: 'custom',
    loaderFile: './src/lib/cloudinary-loader.js',
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.tedprime.net",
        pathname: "/assets/img/**",
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        pathname: '/photos/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
