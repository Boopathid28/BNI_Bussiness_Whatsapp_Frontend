
const { iconsPlugin, getIconCollections } = require("@egoist/tailwindcss-icons")
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "login-bg": "url('/src/assets/images/loginbg.svg')"
      },
      colors: {
        "primary": "#CF2030",
        "light-gray": "#898989",
        "input-gray": "#F4F5F8",
        "header-bg": "#E2E2E2",
        "sidebar-bg": "#E2E2E2"
      }
    },
  },
  plugins: [
    iconsPlugin({
      collections: getIconCollections(["teenyicons", "fluent", "mage", "material-symbols", "iconoir", "solar", "lucide", "line-md"]),
    }),
  ],
}