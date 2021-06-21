const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader', //2. Inject styles into DOM
          'css-loader', //1. Turns css into commonjs
          'sass-loader',
        ],
      },
    ],
  },
});
