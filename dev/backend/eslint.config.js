import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import sharedRules from '../../eslint.common.js';

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, {
  files: ['**/*.ts'],
  rules: {
    ...sharedRules,
  },
});
