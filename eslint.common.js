/** @type {import('eslint').Linter.RulesRecord} */
module.exports = {
  // Errores de compilación y duplicidad
  'no-duplicate-imports': 'error',
  'no-redeclare': 'off', // Se desactiva la versión base para usar la de TS
  '@typescript-eslint/no-redeclare': 'error',
  
  // Variables e imports no usados
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
  
  // Buenas prácticas generales
  '@typescript-eslint/no-explicit-any': 'warn',
  'no-console': ['warn', { 'allow': ['warn', 'error', 'info'] }],
  'eqeqeq': ['error', 'always'],
  'curly': 'error'
};
