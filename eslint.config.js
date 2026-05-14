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
      // This allows 'any' so your older exercises pass
      "@typescript-eslint/no-explicit-any": "off", 
      // This ignores unused variables starting with _ (like _error)
      "@typescript-eslint/no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_", 
        "varsIgnorePattern": "^_" 
      }],
      "no-useless-assignment": "warn" 
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