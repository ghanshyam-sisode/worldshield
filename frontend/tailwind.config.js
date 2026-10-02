/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: {
          DEFAULT: '#090C10',
          secondary: '#0D1117',
        },
        surface: {
          DEFAULT: '#11161D',
          elevated: '#161C24',
        },
        border: {
          DEFAULT: '#232B36',
          strong: '#303B49',
        },
        primary: {
          DEFAULT: '#4F8CFF',
        },
        secondary: {
          DEFAULT: '#4FD1C5',
        },
        success: '#32D583',
        warning: '#F5B94C',
        danger: '#FF6B6B',
        critical: '#FF3B5C',
        info: '#6EA8FF',
      },
    },
  },
  plugins: [],
}
