import parser from "@typescript-eslint/parser";
import reactInternalConfig from "@workspace/eslint-config/react-internal-js";

/** @type {import('eslint').FlatConfig[]} */
const localConfig = {
  ignores: ["apps/**", "packages/**"],

  languageOptions: {
    parser,
    parserOptions: {
      project: true,
    },
  },
};

export default [...reactInternalConfig, localConfig];
