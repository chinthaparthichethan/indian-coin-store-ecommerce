/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B4513',
        secondary: '#D2691E',
        accent: '#CD853F',
        gold: '#FFD700',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
