module.exports = {
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff|ttf|eot)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
