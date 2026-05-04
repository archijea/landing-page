import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1D2320",
        moss: "#586B52",
        sage: "#DDE5D8",
        cloud: "#F5F7F4",
        clay: "#B66E4F",
        line: "#D8DDD5"
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "Apple SD Gothic Neo",
          "Noto Sans KR",
          "Arial",
          "sans-serif"
        ]
      },
      boxShadow: {
        soft: "0 18px 50px rgba(29, 35, 32, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
