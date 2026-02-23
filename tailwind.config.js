/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#22c55e',
          dark: '#16a34a',
          soft: '#bbf7d0',
        },
        surface: {
          DEFAULT: '#020617',
          soft: '#0b1220',
          elevated: '#020617',
        },
      },
      boxShadow: {
        'soft-xl': '0 25px 60px rgba(15,23,42,0.65)',
        card: '0 18px 45px rgba(15,23,42,0.8)',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

