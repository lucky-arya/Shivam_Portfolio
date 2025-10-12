/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'vt323': ['VT323', 'monospace'],
        'press-start': ['Press Start 2P', 'monospace'],
      },
      colors: {
        'crt-green': '#00ff41',
        'vhs-purple': '#ff00ff',
        'amber-glow': '#ffb000',
        'screen-black': '#0a0a0a',
      },
    },
  },
  plugins: [],
}
