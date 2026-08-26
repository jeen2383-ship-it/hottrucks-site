/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#D91E24',
        'primary-dark': '#A5151A',
        ink: '#161211',
        'ink-soft': '#241E1C',
        canvas: '#FFFFFF',
        'canvas-soft': '#F6F1EE',
        body: '#6B6663',
        mute: '#B8ACA6',
      },
      fontFamily: {
        sans: ['Pretendard Variable', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Apple SD Gothic Neo', 'Malgun Gothic', 'sans-serif'],
      },
      borderRadius: {
        pill: '999px',
        card: '14px',
      },
      boxShadow: {
        soft: '0 20px 40px -20px rgba(22, 18, 17, 0.35)',
      },
    },
  },
  plugins: [],
}
