
const config = {
  // Note: With Tailwind v4, most configuration is done in CSS
  // This file is mainly for content paths and v3 compatibility
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Additional theme extensions if needed
  theme: {
    extend: {
      // These are handled in CSS with Tailwind v4, but kept for compatibility
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        urdu: ["var(--font-urdu-body)", "Noto Nastaliq Urdu", "sans-serif"],
        "urdu-display": ["var(--font-urdu-display)", "Noto Nastaliq Urdu", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;