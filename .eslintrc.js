module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/recommended',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.base.config.js',
      },
    },
  },
  rules: {
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
      json: 'never',
    }],
    'vue/custom-event-name-casing': ['warn'],
  },
  overrides: [
    {
      files: ['index.js'],
      rules: {
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
      },
    },
  ],
};
