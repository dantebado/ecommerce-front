module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "comm-l": "#bbe5f0",
        "comm-m": "#3498db",
      },
    },
    fontFamily: {
      sans: ["Poppins"],
    },
  },
  variants: {
    extend: {
      borderRadius: ["hover", "focus"],
    },
  },
  plugins: [],
};
