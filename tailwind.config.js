/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        100: "25rem", // h-100 = 400px
        120: "30rem", // h-120 = 480px
        // 'screen-90': '90vh', // h-screen-90
      },
    },
  },
  plugins: [],
};
