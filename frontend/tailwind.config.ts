/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // ✅ App directory (Next.js App Router)
    "./pages/**/*.{js,ts,jsx,tsx}", // ✅ If using `pages` directory
    "./components/**/*.{js,ts,jsx,tsx}", // ✅ Components directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
