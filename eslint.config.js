import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import jest from "eslint-plugin-jest";

export default tseslint.config(
  // Base JavaScript configuration
  js.configs.recommended,

  // TypeScript configuration
  ...tseslint.configs.recommended,

  {
    // Apply this to all your TS files
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node, 
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off", 
    },
  },

  // Specific configuration for your tests
  {
    files: ["**/*.spec.ts", "**/*.test.ts"],
    plugins: {
      jest,
    },
    languageOptions: {
      globals: {
        ...globals.jest, 
      },
    },
    rules: {
      ...jest.configs.recommended.rules,
    },
  }
);