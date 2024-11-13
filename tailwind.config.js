/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
      },
      colors: {
        primary: "#3b82f6", // Example custom color
        secondary: "#f59e0b", // Example custom color
      },
    },
  },
  plugins: [],
};
