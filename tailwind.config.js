/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
    
      },
      animation: {
        'spin-slow': 'spin-slow 5s linear infinite'
      },
      colors: {
        customDarkBlue: '#1e293c',
      },
      screens: {
        'lg': '1011px',       // Existing custom large breakpoint
        'md': '769px',        // Existing custom medium breakpoint
        'md-custom': '770px', // New custom breakpoint for 770px
      },
    },
  },
  plugins: [],
}
