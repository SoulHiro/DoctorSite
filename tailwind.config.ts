import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        bebas: ['var(--font-bebas)', 'sans-serif'],
      },
      animation: {
        scroll:
          'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': {
            transform: 'translate3d(0, 0, 0)',
          },
          '100%': {
            transform: 'translate3d(calc(-25% - 0.5rem), 0, 0)',
          },
        },
      },
    },
  },
} satisfies Config
