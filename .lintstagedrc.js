module.exports = {
  '*.{ts,tsx,js,jsx}': [
    'eslint --fix',
  ],
  '*.json': [
    'prettier --trailing-comma none --write',
  ]
};
