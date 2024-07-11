/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  corePlugins: {
    // 小程序不需要 preflight，因为这主要是给 h5 的，如果你要同时开发小程序和 h5 端，你应该使用环境变量来控制它
    preflight: false,
  },
  theme: {
    extend: {},
    screens: {
      // xs: "480px",
      // sm: "640px",
      // md: "768px",
      // lg: "1024px",
      // xl: "1280px",
      // "2xl": "1536px",
      // "3xl": "1920px",

      xs: "900px", // 360
      sm: "1200px", // 480
      md: "1500px", // 600
      lg: "1920px", // 768
      xl: "2560px", // 1024
      "2xl": "3200px", // 1280
      "3xl": "3840px", // 1536
    },
  },
  plugins: [],
};
