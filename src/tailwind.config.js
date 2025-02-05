/** @type {import('tailwindcss').Config} */
/// create a rule for tailwind to be able to read index file as well as filetypes for src folder
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fredoka', 'serif'],
      },
    },
  },
  plugins: [],
};
