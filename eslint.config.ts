import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  tseslint.configs.stylisticTypeChecked,
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
