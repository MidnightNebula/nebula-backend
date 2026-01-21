// @ts-check

import eslint from '@eslint/js';
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import { defineConfig } from "eslint/config";
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    ignores: ["eslint.config.*", "dist/**", "node_modules/**"]
  },
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      "no-relative-import-paths/no-relative-import-paths": [
        "warn",
        { allowSameFolder: false, rootDir: "src", prefix: "@" },
      ],
    },
  },
  {
    plugins: {
      "no-relative-import-paths": noRelativeImportPaths,
    },
    rules: {
      "no-relative-import-paths/no-relative-import-paths": "error",
    },
  },
]);
