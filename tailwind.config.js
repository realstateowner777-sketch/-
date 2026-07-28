/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        party: {
          navy: '#0b1329',
          royal: '#1e3a8a',
          blue: '#1d4ed8',
          slate: '#1e293b',
          gold: '#f59e0b',
          amber: '#fbbf24',
          darkgold: '#d97706',
        },
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        changa: ['Changa', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'fadeIn': 'fadeIn 0.4s ease-out forwards',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
