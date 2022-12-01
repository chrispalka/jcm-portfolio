const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const path = require('path');

const SRC_DIR = path.join(__dirname, 'client/src');


module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html',
      // favicon: './client/src/assets/favicon.ico'
    }),
    new NodePolyfillPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: 'main.css',
    }),
    new Dotenv({
      path: path.resolve(__dirname, './.env')
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        include: SRC_DIR,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        }, 'css-loader'
        ],
      },
      {
        test: [/\.(eot|mp4|ttf|otf|woff|woff2|)$/, /favicon-16x16\.png$/],
        type: 'asset/resource'
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: '[name].bundle.js',
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};

