module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // keyframes: {
      //   'fade-in': {
      //     '0%': { opacity: 0, transform: 'scale(0.95)' },
      //     '100%': { opacity: 1, transform: 'scale(1)' },
      //   },
      //   'fade-out': {
      //     '0%': { opacity: 1, transform: 'scale(1)' },
      //     '100%': { opacity: 0, transform: 'scale(0.95)' },
      //   },
      // },
      // animation: {
      //   'fade-in': 'fade-in 0.3s ease-out',
      //   'fade-out': 'fade-out 0.3s ease-in',
      // },
      fontFamily: {
        'twitter-chirp': ['TwitterChirp', 'sans-serif'],
        'twitter-chirp-heavy': ['TwitterChirpExtendedHeavy', 'sans-serif'],
      },
      colors: {
        'light-primary': '#f5f5f5', // Replace with your actual color value
        'dark-primary': '#222222',  // If you have a dark-primary color
        // Add more colors as needed
      },
    },
  },
  plugins: [],
};

