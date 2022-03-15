import { defineConfig } from 'vite-plugin-windicss';

function range(size: number, startAt = 1) {
  return Array.from(Array(size).keys()).map((i) => i + startAt);
}

export default defineConfig({
  safelist: [
    range(3).map((i) => `p-${i}`), // p-1 到 p-3
    range(10).map((i) => `mt-${i}`), // mt-1 到 mt-10
  ],
  extract: {
    include: ['src/**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules', '.git'],
  },
  theme: {
    fontWeight: {
      bold: 600,
    },
    lineHeight: {
      normal: '1.4',
      more: '2',
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
      primary: '#191C32',
      white: '#ffffff',
      theme: '#151727',
    }),
    fontSize: {
      '14': '1.4rem',
      '15': '1.5rem',
      '16': '1.6rem',
      '18': '1.8rem',
    },
    extend: {
      colors: {
        white: '#ffffff',
        '999': '#999',
        doing: 'rgba(52, 142, 255, 1)',
        pickup: 'rgba(75,184, 192, 1)',
        error: 'rgba(253, 97, 48, 1)',
        InfoReceived: 'rgba(75,184,192,1)',
        pending: 'rgba(52, 142, 255, 1)',
      },
      width: {
        'home-half': '49%',
      },
      screens: {
        mn: {
          min: '310px',
        },
        sm: {
          min: '640px',
        },
        '2xl': {
          min: '1740px',
        },
      },
    },
  },
});
