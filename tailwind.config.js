/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#18181b",
        graphite: {
          DEFAULT: "#242424",
          canvas: "#18181b",
          surface: "#1f2024",
          hover: "#292a30"
        },
        steel: {
          DEFAULT: "#adb3b7",
          muted: "rgba(173, 179, 183, 0.6)",
          hairline: "rgba(173, 179, 183, 0.18)"
        },
        chalk: "#e7ece5",
        vermilion: {
          DEFAULT: "#ff7235",
          hover: "#ff854f",
          glow: "rgba(255, 114, 53, 0.24)"
        },
        tungsten: "#ffa043",
        royal: "#3B82F6",
        emerald: "#10B981"
      }
    }
  },
  plugins: []
};
