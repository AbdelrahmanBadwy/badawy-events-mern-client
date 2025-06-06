/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2970ff",
        info: "#C40C0C",
      },
    },
  },
  plugins: [],
};
