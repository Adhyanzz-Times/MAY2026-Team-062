/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6D28D9',
          dark: '#5B21B6',
          light: '#A78BFA',
          soft: '#F5F3FF' // Soft lavender/violet tint
        },
        charcoal: {
          DEFAULT: '#111827',
          dark: '#0B0F19',
          light: '#1F2937'
        },
        background: '#FAFAFA',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444'
      }
    },
  },
  plugins: [],
}


