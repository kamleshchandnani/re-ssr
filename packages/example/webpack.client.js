require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const babelConfig = require('./.babelrc.js');
const configJs = require('./config.js')[process.env.STAGE];
const packageJson = require('./package.json');

const isProd = process.env.STAGE !== 'development';

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './src/client.js',
  output: {
    path: path.resolve(__dirname, 'build/client'),
    filename: isProd ? `js/[name].[chunkhash:8].js` : `js/[name].js`,
    chunkFilename: isProd ? `js/[name].[chunkhash:8].js` : `js/[name].js`,
    publicPath: `${configJs.assetsUrl}/${packageJson.name}/build/client/`,
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
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|ico|webp)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: isProd ? '[name].[hash:8].[ext]' : '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: 'svg-url-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['raw-loader'],
      },
    ],
  },
  optimization: {
    moduleIds: isProd ? 'hashed' : 'named',
    splitChunks: {
      // include all types of chunks(sync and async) for optimisation
      chunks: 'all',
    },
    runtimeChunk: 'single',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new InjectManifest({
      swSrc: path.resolve(__dirname, 'serviceWorker.js'),
      swDest: 'service-worker.js',
      exclude: [/\.map$/, /\.json$/],
      maximumFileSizeToCacheInBytes: '3000000',
    }),
    new webpack.DefinePlugin({
      __IS_BROWSER__: 'true',
      UNSPLASH_ACCESS_KEY: JSON.stringify(process.env.UNSPLASH_ACCESS_KEY),
      __STAGE__: JSON.stringify(process.env.STAGE),
      __VERSION__: JSON.stringify(packageJson.version),
      __NAME__: JSON.stringify(packageJson.name),
      __CONFIG__: JSON.stringify(configJs),
    }),
    new CopyWebpackPlugin({ patterns: [{ from: './src/offline/offline.html' }] }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    !isProd
      ? new WebpackBar({
          color: 'blue',
          name: 'client',
        })
      : null,
  ].filter(Boolean),
  devServer: {
    writeToDisk: true,
    hot: true,
    serveIndex: false,
    port: 9000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
