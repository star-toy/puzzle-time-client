import type { NextConfig } from 'next';

const config: NextConfig = {
  optimization: {
    minimize: true,
    usedExports: true,
  },
};

export default config;
