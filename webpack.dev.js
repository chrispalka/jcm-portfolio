const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common');
const DIST_DIR = path.join(__dirname, 'public');


module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: {
      directory: DIST_DIR,
    },
    compress: true,
    port: 8080,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '**': {
        target: 'http://localhost:3000/',
        pathRewrite: {
          '^/api': ''
        },
        secure: false,
        changeOrigin: true,
      }
    },
  },
  output: {
    filename: '[name].dev.js',
    path: DIST_DIR,
    publicPath: '/',
  },
  devtool: "inline-source-map",
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('development'),
      DOMAIN: JSON.stringify('http://localhost:3000/')
    })
  ]
});