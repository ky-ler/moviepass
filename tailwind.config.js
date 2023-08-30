/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./public/**/*.{css, html,js}",
    "./views/*.ejs",
    "./views/partials/*.ejs",
  ],
  theme: {
    // colors: {
    //   transparent: "transparent",
    //   current: "currentColor",
    //   teal: "#84E6D9",
    //   "med-teal": "#2ACBB6",
    //   "dark-teal": "#0DA094",
    //   "darkest-teal": "#0A8076",
    //   "med-grey": "#64748B",
    //   "darker-grey": "#334155",
    //   "darkest-grey": "#1e293b",
    //   "off-white": "#f8fafc",
    // },
    extend: {},
  },
  daisyui: {
    themes: ["night"],
  },
  plugins: [require("daisyui")],
};
