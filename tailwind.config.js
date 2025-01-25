// tailwind.config.js
module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        color: {
          'primary': '#9810FA',
          'light': '#C076FF',
          'secondary': {
            100: '#E2E2D5',
            200: '#888883',
          }
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }