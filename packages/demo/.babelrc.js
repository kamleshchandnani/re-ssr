module.exports = {
  // common babel config
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-export-default-from',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-optional-chaining', { loose: true }],
    ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
        helpers: true,
        regenerator: false,
      },
    ],
    [
      'babel-plugin-styled-components',
      {
        displayName: true,
        pure: false,
        ssr: true,
      },
    ],
  ],
};
