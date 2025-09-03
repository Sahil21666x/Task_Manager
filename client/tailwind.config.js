/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2563eb", // blue-600
        },
        accent: {
          DEFAULT: "#10b981", // emerald-500
        },
      },
    },
  },
  plugins: [],
}
