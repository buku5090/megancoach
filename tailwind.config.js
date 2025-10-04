/** @type {import('tailwindcss').Config} */
// plugins: [require('daisyui')],
// daisyui: { themes: ["light"] },


export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // NU 'media'. Asta dezactivează modul automat.
  theme: { extend: {} },
  plugins: [],
};
