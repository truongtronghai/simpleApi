// eslint.config.ts
import js from '@eslint/js'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier' // Import the config

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    ignores: ['**/*.config.ts', 'dist/**'], // Add 'dist/**' to ignore compiled output
    languageOptions: {
      parser: tsParser,
      globals: {
        process: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': ts,
      'prettier': prettier,
    },
    rules: {
      ...eslintConfigPrettier.rules, // Integrate Prettier rules
      'prettier/prettier': 'error', // Enforce Prettier rules as ESLint errors
      // Add your custom ESLint rules here
    },
  },
]
