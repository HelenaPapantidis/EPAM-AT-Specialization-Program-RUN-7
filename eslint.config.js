import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  js.configs.recommended,
  prettierConfig,
  {
    plugins: {
      prettier,
    },
    rules: {
      "prettier/prettier": "error",
      "no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_|error" },
      ],
      "no-console": "off",
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        // Node.js
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
        console: "readonly",
        // Browser/Fetch
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        fetch: "readonly",
        Response: "readonly",
        // Test globals (Jest/Mocha)
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        before: "readonly",
        beforeAll: "readonly",
        beforeEach: "readonly",
        after: "readonly",
        afterAll: "readonly",
        afterEach: "readonly",
        expect: "readonly",
        // Cypress
        cy: "readonly",
        Cypress: "readonly",
        // WebdriverIO
        browser: "readonly",
        $: "readonly",
        $$: "readonly",
      },
    },
  },
  {
    ignores: [
      "node_modules/**",
      "mochawesome-report/**",
      "playwright-report/**",
      "test-results/**",
      "wdio-html-report/**",
      "cypress/mochawesome-report/**",
      "playwright/playwright-report/**",
      "playwright/test-results/**",
      "wdio-TAF/wdio-html-report/**",
      "wdio-TAF/screenshots/**",
      "wdio-chai-basic/wdio-html-report/**",
    ],
  },
];
