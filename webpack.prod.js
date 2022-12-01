const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
const DIST_DIR = path.join(__dirname, 'public');
require('dotenv').config();


module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].prod.js',
    path: DIST_DIR,
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.DOMAIN': JSON.stringify(process.env.DOMAIN)
    })
  ],
});