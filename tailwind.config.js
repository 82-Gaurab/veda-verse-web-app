/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",       // scan everything inside /app
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // scan components
  ],
  theme: {
    extend: {
      boxShadow: {
        innerActive: "inset 0 5px 8px rgba(0, 0, 0, 0.2)", // your custom shadow
      },
    },
  },
  plugins: [],
};
