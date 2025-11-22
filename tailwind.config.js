/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier Prime', 'monospace'],
        'terminal': ['Courier Prime', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        terminal: {
          bg: '#0A0A0A',
          green: '#00FF88',
          red: '#FF3B3B',
          orange: '#FF9500',
          cyan: '#00D9FF',
        },
      },
      boxShadow: {
        'error': '0 0 10px rgba(255, 59, 59, 0.3)',
        'error-lg': '0 0 20px rgba(255, 59, 59, 0.4)',
      },
    },
  },
  plugins: [],
}
