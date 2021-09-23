module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaFeatures: {
      ecmaVersion: 2018,
      sourceType: 'module',
      experimentalObjectRestSpread: true,
      legacyDecorators: true
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    /**
     * eslint-rules
     */
    'valid-jsdoc': 'warn',
    'array-bracket-spacing': ['error', 'never'],
    'no-case-declarations': 'off',
    'comma-dangle': 'off',

    /**
     * @typescript-eslint rules
     */
    '@typescript-eslint/array-type': ['error', {default: 'generic'}],
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "prefix": ["I"]
      }
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off'
  }
};
