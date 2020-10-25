const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Общие переменные для нескольких конфигов
const PATHS = {
  src_app: path.join(__dirname, 'src/js/index.js'),
  src_admin: path.join(__dirname, 'src/js/admin.js'),
  dist: path.join(__dirname, 'dist'),
}

module.exports = {
  entry: {
    app: PATHS.src_app,
    admin: PATHS.src_admin,
  },
  output: {
    filename: '[name].[contenthash:8].js',
    path: PATHS.dist,
  },
  resolve: {
    alias: {
        js: path.resolve(__dirname, 'src/js/'),
        css: path.resolve(__dirname, 'src/scss/'),
    },
},
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      chunks: ['app']
    }),
    new HtmlWebpackPlugin({
      title: 'Admin app',
      filename: 'admin.html',
      chunks: ['admin']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    }),
  ],
};