import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#00b7ff",

          secondary: "#00d8f2",

          accent: "#0062ff",

          neutral: "#382620",

          "base-100": "#e7fff1",

          info: "#008ac4",

          success: "#00ad36",

          warning: "#985000",

          error: "#de0019",
        },
      },
    ],
  },
};
export default config;
