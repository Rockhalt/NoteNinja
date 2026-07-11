/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000", // Deep Black
        surface: "#0a0a0a",    // Dark Charcoal Card Background
        primary: "#2563eb",    // Electric Blue
        primaryHover: "#1d4ed8", // Darker Blue for hovering states
      },
      fontFamily: {
        signature: ['"Photography Signature"', 'cursive'], 
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}