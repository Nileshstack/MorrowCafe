import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cafe: {
          cream: "#f4eee3",
          paper: "#fffaf1",
          coffee: "#735748",
          espresso: "#33251e",
          terracotta: "#a64b32",
          sage: "#87917a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;