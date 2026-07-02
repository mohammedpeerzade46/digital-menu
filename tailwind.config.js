/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Cormorant Infant"', 'Georgia', 'serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ivory: {
          DEFAULT: '#F6F2EA',
          light: '#F8F5EF',
          soft: '#F1EADC',
        },
        sand: {
          DEFAULT: '#EDE4D8',
          deep: '#E6D8C5',
        },
        camel: '#DCCCB8',
        gold: {
          DEFAULT: '#C6A664',
          soft: '#D9BE87',
          deep: '#A9873F',
          foil: '#E7CF88',
        },
        ink: {
          DEFAULT: '#2A2624',
          soft: '#5C554F',
          brown: '#3E2F20',
        },
        paperborder: '#E2D9C8',
      },
      boxShadow: {
        'book': '0 40px 80px -20px rgba(60, 42, 20, 0.35), 0 20px 40px -10px rgba(60, 42, 20, 0.25)',
        'card-lux': '0 30px 60px -20px rgba(60, 42, 20, 0.35)',
        'page': 'inset 0 0 60px rgba(140, 105, 55, 0.08)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'fade-up': { '0%': { opacity: 0, transform: 'translateY(12px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        'shimmer': { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-up': 'fade-up 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) forwards',
        'shimmer': 'shimmer 3.6s linear infinite',
      },
    },
  },
  plugins: [],
};
