import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const config = [...nextCoreWebVitals, ...nextTypeScript];

const eslintConfig = [
  ...config,
  {
    ignores: [
      ".next/**",
      ".next-*/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },
];

export default eslintConfig;
