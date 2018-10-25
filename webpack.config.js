// webpack v4

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  context: __dirname + "/src",
  entry: { main: './js/index.js' },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[chunkhash].js'
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: '8000',
    watchOptions: {
      ignored: /node_modules/
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }, {
        test: /\.scss$/,
        exclude: /color.scss$/,
        use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }, {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1000, // Convert images < 8kb to base64 strings
            name: '[path][name].[ext]'
          }
        }]
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [ 'file-loader' ]
      }
    ]
  },
  stats: {
    children: false
  },
  plugins: [
    new CleanWebpackPlugin('public', {} ),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './index.html',
      filename: 'index.html'
    }),
    new WebpackMd5Hash(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    })
  ]
};