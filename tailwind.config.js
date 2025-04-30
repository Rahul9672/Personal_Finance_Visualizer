module.exports = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}', // add paths relevant to your project
  ],
  theme: {
    extend: {
      colors: {
        green: {
          600: '#16a34a', // for income
        },
        red: {
          600: '#dc2626', // for expenses
        },
      },
    },
  },
  plugins: [],
}
