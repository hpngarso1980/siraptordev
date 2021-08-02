module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        loose: true,
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 2,
      },
    ],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-json-strings',
  ],
  env: {
    test: {
      presets: ['@babel/preset-env'],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: 2,
          },
        ],
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-json-strings',
      ],
    },
  },
};
