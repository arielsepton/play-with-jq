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
      'vs': {
        bg: '#ffffff',
        text: '#000000'
      },
      'vs-dark': {
        bg: '#1e1e1e',
        text: '#ffffff'
      },
      'hc-black': {
        bg: '#000000',
        text: '#ffffff'
      },
      'hc-light': {
        bg: '#ffffff',
        text: '#000000'
      },
      'dracula-theme': {
        bg: '#282a36',
        text: '#ffffff'
      }
      // Add more styles as needed...
    },
    extend: {
      textareaColors: {
        'vs': 'bg-vs text-vs',
        'vs-dark': 'bg-vs-dark text-vs-dark',
        'hc-black': 'bg-hc-black text-hc-black',
        'hc-light': 'bg-hc-light text-hc-light',
        'dracula-theme': 'bg-dracula-theme text-dracula-theme',
      },
    },
  },
  plugins: [],
}