/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      transparent: 'transparent',
      success: "#22c55e",
      alert: "#fbbf24",
      error: "#b91c1c",
      "default-white": "#f1f5f9",
      "default-black": "#1a202c",
    },
    fontFamily:{
      sans: ['Montserrat', 'sans-serif'],
      serif: ['Roboto', 'serif'],
    },
    extend: {
      spacing:{
        "100": "30rem",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    })
  ],
}

