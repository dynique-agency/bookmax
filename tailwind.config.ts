import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#16120E',
        ink2: '#211C17',
        coffee: '#7C5C3A',
        warm: '#B8956A',
        sand: '#C9AB87',
        cream: '#F8F4EE',
        cream2: '#EEE7DC',
        cream3: '#E3D9CC',
        linen: '#FDFAF6',
        stone: '#6E675F',
        stone2: '#9E9890',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        satoshi: ['var(--font-satoshi)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
