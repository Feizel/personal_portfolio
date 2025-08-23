/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Space Grotesk', 'system-ui', 'sans-serif'],
        'retro': ['Orbitron', 'monospace'],
        'cursive': ['Dancing Script', 'cursive'],
      },
      animation: {
        'in': 'fadeIn 0.2s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'typing': 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite',
        'blink': 'blink 1s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glow: {
          '0%': { 
            textShadow: '0 0 5px #f97316, 0 0 10px #f97316, 0 0 15px #f97316',
            boxShadow: '0 0 5px #f97316, 0 0 10px #f97316, 0 0 15px #f97316'
          },
          '100%': { 
            textShadow: '0 0 10px #f97316, 0 0 20px #f97316, 0 0 30px #f97316',
            boxShadow: '0 0 10px #f97316, 0 0 20px #f97316, 0 0 30px #f97316'
          },
        },
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 5px #f97316, 0 0 10px #f97316, 0 0 15px #f97316, 0 0 20px #f97316'
          },
          '50%': { 
            boxShadow: '0 0 10px #f97316, 0 0 20px #f97316, 0 0 30px #f97316, 0 0 40px #f97316'
          },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
      },
      colors: {
        'true-black': '#000000',
      }
    },
  },
  plugins: [],
};