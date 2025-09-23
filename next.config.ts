import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[{
      hostname:"fastly.picsum.photos",
      protocol: 'https',
      port:"",
    },
    ],
  },
};

export default nextConfig;
