import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Add custom colors for the new navbar
        "nav-bg": "rgba(117,183,225,0.61)",
        "nav-border": "rgba(158,171,227,0.4)",
        "nav-text": "#2a1816",
      },
      borderRadius: {
        '4xl': '2rem', // For the rounded corners of the navbar
      },
    },
  },
  plugins: [],
} satisfies Config;
