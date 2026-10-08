import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Direção das dependências (docs/ARCHITECTURE.md):
// app → features → components → lib. Uma camada nunca importa de cima.
const restrictImports = (groups, message) => ({
  "no-restricted-imports": ["error", { patterns: [{ group: groups, message }] }],
});

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["features/**"],
    rules: restrictImports(
      ["@/app/*"],
      "features/ não importa de app/. Mova o código compartilhado para features/ ou components/."
    ),
  },
  {
    files: ["components/**"],
    rules: restrictImports(
      ["@/app/*", "@/features/*", "@/server/*"],
      "components/ não conhece domínio: receba dados por props em vez de importar de app/, features/ ou server/."
    ),
  },
  {
    files: ["lib/**"],
    rules: restrictImports(
      ["@/app/*", "@/features/*", "@/components/*", "@/server/*"],
      "lib/ só contém utilitários puros, sem dependência de UI, domínio ou servidor."
    ),
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
