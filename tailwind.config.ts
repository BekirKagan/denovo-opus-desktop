/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': "#0a0908",
        'foreground': "#eae0d5",
        'primary': {
          '50': '#f9f5fe',
          '100': '#f4ebfc',
          '200': '#e7d5f9',
          '300': '#d6b4f3',
          '400': '#bf88ea',
          '500': '#a359dc',
          '600': '#873abf',
          '700': '#712d9e',
          '800': '#5e2781',
          '900': '#51246b',
          '950': '#2b0b3d',
        },
        'priority': {
          'negligible': "#aaaaaa",
          'low': "#97e600",
          'moderate': "#ffd500",
          'high': "#ff850a",
          'critical': "#ff1111",
        }
      },
    },
  },
  plugins: [],
}

