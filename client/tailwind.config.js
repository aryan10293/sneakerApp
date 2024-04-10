/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '2xl': '1.75rem', // Custom 2xl font size
        '3xl': '2rem',    // Custom 3xl font size
        // Add more custom font sizes as needed
      }
    }
  },
  plugins: [],
}

