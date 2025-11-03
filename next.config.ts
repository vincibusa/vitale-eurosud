import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'skzhmbjhspezlzeoycdn.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/vehicle-images/**',
      },
    ],
  },
};

export default nextConfig;
