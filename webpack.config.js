const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    index: './src/js/index/index.js',
    guest: './src/js/guest/guest.js',
    franchize: './src/js/franchize/franchize.js',
    blog: './src/js/blog/blog.js',
    blog1: './src/js/blog/blog1/blog1.js',
    event: './src/js/event/event.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: './' },
          },
          'css-loader',
        ],
      },
      { test: /\.(js)$/, use: 'babel-loader' },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    assetModuleFilename: 'images/[name][ext]',
    clean: true,
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    open: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/images'),
          to: path.resolve(__dirname, 'dist/images'),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: false,
      hash: true,
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: './src/guest.html',
      filename: 'guest.html',
      minify: false,
      hash: true,
      chunks: ['guest'],
    }),
    new HtmlWebpackPlugin({
      template: './src/franchize.html',
      filename: 'franchize.html',
      minify: false,
      hash: true,
      chunks: ['franchize'],
    }),
    new HtmlWebpackPlugin({
      template: './src/blog.html',
      filename: 'blog.html',
      minify: false,
      hash: true,
      chunks: ['blog'],
    }),
    new HtmlWebpackPlugin({
      template: './src/blog1.html',
      filename: 'blog1.html',
      minify: false,
      hash: true,
      chunks: ['blog1'],
    }),
    new HtmlWebpackPlugin({
      template: './src/event.html',
      filename: 'event.html',
      minify: false,
      hash: true,
      chunks: ['event'],
    }),
    new MiniCssExtractPlugin({}),
  ],
};
