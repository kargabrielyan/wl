/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#002c46', // Основной цвет - темно-синий
          600: '#002238',
          700: '#001d2e',
          800: '#001824',
          900: '#00131a',
        },
        secondary: {
          50: '#fefcf7',
          100: '#fdf8ed',
          200: '#faf0d3',
          300: '#f7e8b9',
          400: '#f4e09f',
          500: '#f3d98c', // Второстепенный цвет - светло-желтый
          600: '#f1d47a',
          700: '#efcf68',
          800: '#edca56',
          900: '#ebc544',
        },
        blue: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#002c46', // Заменяем стандартный blue-500
          600: '#002238', // Заменяем стандартный blue-600
          700: '#001d2e',
          800: '#001824',
          900: '#00131a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
