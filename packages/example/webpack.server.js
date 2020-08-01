require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const babelConfig = require('./.babelrc.js');
const configJs = require('./config.js')[process.env.STAGE];
const packageJson = require('./package.json');

const isProd = process.env.STAGE !== 'development';

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './src/server.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, 'build/server'),
    filename: 'server.js',
    // publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              cacheDirectory: !isProd,
              ...babelConfig,
              // ...{
              //   presets: [
              //     ...new Set([
              //       ...babelConfig.presets,
              //       [
              //         '@babel/preset-env',
              //         {
              //           corejs: 3,
              //           useBuiltIns: 'usage',
              //           targets: {
              //             node: 'current',
              //           },
              //         },
              //       ],
              //     ]),
              //   ],
              //   plugins: [...new Set([...babelConfig.plugins])],
              // },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['raw-loader'],
      },
    ],
    // rules: [{ test: /\.(js)$/, use: 'babel-loader' }],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      __IS_BROWSER__: 'false',
      UNSPLASH_ACCESS_KEY: JSON.stringify(process.env.UNSPLASH_ACCESS_KEY),
      __STAGE__: JSON.stringify(process.env.STAGE),
      __VERSION__: JSON.stringify(packageJson.version),
      __NAME__: JSON.stringify(packageJson.name),
      __CONFIG__: JSON.stringify(configJs),
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    !isProd ? new webpack.HotModuleReplacementPlugin() : null,
    !isProd
      ? new WebpackBar({
          color: 'green',
          name: 'server',
        })
      : null,
  ].filter(Boolean),
};
