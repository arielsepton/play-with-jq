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
      backgroundColor: {
        'vs': '#ffffff',
        'vs-dark': '#1e1e1e',
        'hc-black': '#000000',
        'hc-light': '#ffffff',
        'dracula-theme': '#282a36',
      },
      textColor: {
        'vs': '#000000',
        'vs-dark': '#ffffff',
        'hc-black': '#ffffff',
        'hc-light': '#000000',
        'dracula-theme': '#f8f8f2',
      },
      // Add more styles as needed...
    },
  },
  plugins: [],
}