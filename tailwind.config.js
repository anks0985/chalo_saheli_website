module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          50: '#f0f9ff',  // light blue
          100: '#CCEDFF', // blue
          200: '#FF9000', // orange
          300: '#CE597C', // pink
          400: '#333333', // dark
          500: '#F8F8F8', // light
        },
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}