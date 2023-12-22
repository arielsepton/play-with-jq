/** @type {import('tailwindcss').Config} */
module.exports = {
  "typeRoots": [
    "./typings",
    "./node_modules/@types/"
  ],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        loading: 'loading 2s linear infinite',
      },
    },
  },
  plugins: [],
}