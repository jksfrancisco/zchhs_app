import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/",  
        destination: "/login", 
        permanent: false, 
      },
    ];
  },
};

export default nextConfig;
