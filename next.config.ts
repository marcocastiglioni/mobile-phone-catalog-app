import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src')],
    prependData: `
      @use "styles/abstracts/_index.scss" as *;
      @use "styles/base/_index.scss" as *;
    `,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'prueba-tecnica-api-tienda-moviles.onrender.com',
        port: '',
        pathname: '/images/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
