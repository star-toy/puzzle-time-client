import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    turbo: {
      resolveAlias: {
        '@/*': ['./*'],
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd2429op99n3dja.cloudfront.net',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  async redirects() {
    return [
      {
        source: '/mypage',
        destination: '/mypage/studio',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
