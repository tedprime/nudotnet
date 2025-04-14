import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
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
      }
    ],
  },
};

export default nextConfig;
