/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      jotiRegular: ["joti-regular"],
      interRegular: ["inter-regular"]
    }
  },
  plugins: [],
}