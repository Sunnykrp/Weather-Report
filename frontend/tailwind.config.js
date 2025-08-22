/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        card: '0 10px 20px -8px rgba(0,0,0,0.25)', // 👈 adds shadow-card
      },
    },
  },
  plugins: [],
}