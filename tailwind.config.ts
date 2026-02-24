import type {Config} from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C42424',
          dark: '#B80B0B',
        },
        accent: {
          DEFAULT: '#FFBF00',
          gold: '#D9AF36',
        },
        star: '#FFC419',
        dark: {
          DEFAULT: '#1A1A1A',
          secondary: '#2A2A2A',
          border: '#3A3A3A',
        },
        gray: {
          DEFAULT: '#5A5A5A',
          light: '#8A8A8A',
          border: '#CACACA',
          bg: '#F7F7F7',
        },
      },
      fontFamily: {
        rajdhani: ['Rajdhani', 'sans-serif'],
        bricolage: ['Bricolage Grotesque', 'sans-serif'],
      },
      fontSize: {
        'heading-xl': ['36px', {lineHeight: '1.2', fontWeight: '600'}],
        'heading-lg': ['24px', {lineHeight: '1.3', fontWeight: '600'}],
        'heading-md': ['18px', {lineHeight: '1.4', fontWeight: '600'}],
        'body-lg': ['18px', {lineHeight: '1.5', fontWeight: '400'}],
        'body-md': ['16px', {lineHeight: '1.5', fontWeight: '400'}],
        'body-sm': ['14px', {lineHeight: '1.5', fontWeight: '400'}],
        'body-xs': ['12px', {lineHeight: '1.5', fontWeight: '300'}],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        'container': '72px',
      },
      maxWidth: {
        'container': '1296px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config;
