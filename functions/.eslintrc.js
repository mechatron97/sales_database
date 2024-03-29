module.exports = {
  "root": true,
  "env": {
    es6: true,
    node: true,
    jquery: true,
    browser: true,
  },
  "extends": [
    "eslint:recommended",
    "google",
  ],
  "rules": {
    quotes: ["error", "double"],
  },
  "parserOptions": {
    "ecmaVersion": 8,
  },
};
