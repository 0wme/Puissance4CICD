import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,   // Si ton projet est pour le navigateur
        ...globals.node,      // Ajoute les globales de Node.js, comme 'module', 'require', etc.
        ...globals.jest,      // Ajoute Jest pour les tests
      },
    },
  },
  pluginJs.configs.recommended,
];