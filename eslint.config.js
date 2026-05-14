import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import jest from "eslint-plugin-jest";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // This applies to ALL files (js and ts)
    languageOptions: {
      globals: {
        ...globals.node, // This defines 'console', 'process', etc.
      },
    },
    rules: {
      "prefer-const": "error",
      "no-console": "off",
      // This ignores unused variables if they start with an underscore (like _error)
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
    },
  },
  {
    files: ["**/*.spec.ts", "**/*.test.ts"],
    plugins: { jest },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  }
);