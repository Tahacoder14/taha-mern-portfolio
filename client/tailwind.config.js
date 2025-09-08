/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#121212', // A deep, rich black
        'card-bg': '#1e1e1e', // Slightly lighter for cards
        'primary': '#bb86fc', // A vibrant purple for accents
        'primary-variant': '#3700b3',
        'light-text': '#e0e0e0', // Soft white for text
        'secondary-text': '#a0a0a0', // Grey for less important text
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // A clean, modern font
      },
    },
  },
  plugins: [],
};