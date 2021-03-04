module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "comm-l": "#bbe5f0",
        "comm-m": "#3498db",
      },
    },
  },
  variants: {
    extend: {
      borderRadius: ["hover", "focus"],
    },
  },
  plugins: [],
};
