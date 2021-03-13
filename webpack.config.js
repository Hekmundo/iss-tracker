const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
   ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './src/images', to: 'images' },
        { from: './src/style.css', to: 'style.css' },
        { from: './src/fonts', to: 'fonts' }
      ]
    }),
    new HtmlPlugin({
      template: './src/index.html'
    }),
  ],
};