/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#000000",
          gray: "#B0B0B0",
          white: "#FFFFFF",
          blue: "#2563EB",
          light: "#F9FAFB",
          dark: "#111827",
          mid: "#4B5563",
        },
      },
    },
  },
  plugins: [],
};
