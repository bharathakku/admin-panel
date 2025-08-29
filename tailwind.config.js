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
      screens: {
        'xs': '450px',
        // Add other custom breakpoints if needed
      },
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
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      minHeight: {
        '44': '44px', // For touch targets
      },
      minWidth: {
        '44': '44px', // For touch targets
      },
    },
  },
  plugins: [],
};
