import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import sharedRules from '../../eslint.common.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, {
  files: ['**/*.ts'],
  languageOptions: {
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
    },
  },
  rules: {
    ...sharedRules,
  },
});
