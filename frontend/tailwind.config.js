/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      tesm: '414px',
      tsm: '640px',
      tmd: '768px',
      tlg: '1024px',
      txl: '1280px',
      big: '1536px',
      t2xl: '1536px',
      '2xl': { max: '1536px' },
      xl: { max: '1280px' },
      lg: { max: '1024px' },
      md: { max: '768px' },
      sm: { max: '640px' },
      sm2: { max: '400px' },
      sm3: { max: '325px' },
    },
    extend: {
      colors: {
        Black: {
          100: '#313133',
          200: '#202124',
          300: '#1D1D1F',
          400: '#171719',
          500: '#040B14',
        },
        Gray: {
          700: '#8C8A93',
          500: '#A5A8B0',
        },
        Green: {
          300: '#45EA69',
          400: '#3bd25c',
        },
        Red: {
          400: '#FF6363',
          500: '#Ef4444',
          600: '#f23232',
        },
        Purple: {
          400: '#2C1C4B',
        },
        White: {
          300: '#DCDEE3',
        },
      },
    },
  },
  plugins: [],
}
