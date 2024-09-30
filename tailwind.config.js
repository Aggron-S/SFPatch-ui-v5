/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      keyframes: {
        bounceIn: {
          "0%": {
            transform: "scale(0.5)",
            opacity: "0"
          },
          "50%": {
            transform: "scale(1.1)",
            opacity: "1"
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1"
          }
        }
      },
      animation: {
        bounceIn: "bounceIn 0.3s ease-in-out",
      },
    },
    colors: {
      "primary-purple-500": "#8951FF",
      "primary-bg-500": "#101935",
      "secondary-purple-500": "#343B4F",
      "secondary-cyan-500": "#57C3FF",
      "secondary-blue-500": "#9A91FB",
      "secondary-yellow-500": "#FDB52A",
      "neutral-bg-800": "#080F25",
      "neutral-bg-700": "#212C4D",
      "neutral-bg-600": "#37446B",
      "nautral-bg-500": "#7E89AC",
      "text-400": "#AEB9E1",
      "text-300": "#D1DBF9",
      "text-200": "#D9E1FA",
      "text-100": "#FFFFFF",
    },
    gridTemplateColumns: {
      "30/70": "20% 80%",
      "1": "repeat(1, minmax(0, 1fr))",
      "2": "repeat(2, minmax(0, 1fr))",
      "3": "repeat(3, minmax(0, 1fr))",
    },
    gridTemplateRows: {
      "20/80": "10% 90%",
    },
  },
  plugins: [],
};