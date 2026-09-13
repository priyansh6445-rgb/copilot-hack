/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: { colors: { ink: '#1B1712', cream: '#F1E7D6', copper: '#B8763E', gold: '#C9A66B', maroon: '#5E1F23', saffron: '#B8763E', moss: '#59634a', paper: '#E9DDCA' }, fontFamily: { display: ['Fraunces', 'serif'], sans: ['Archivo', 'sans-serif'] } } },
  plugins: []
}
