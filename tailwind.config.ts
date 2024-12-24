import type { Config } from 'tailwindcss';

export default {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'background': 'var(--background)',
        'foreground': 'var(--foreground)',
        'popup-primary': 'var(--popup-primary)',
        'popup-secondary': 'var(--popup-secondary)',
      },
    },
  },
  plugins: [],
} satisfies Config;
