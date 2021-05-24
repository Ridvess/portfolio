const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin =require('copy-webpack-plugin');
const devServer = require('webpack-dev-server');


module.exports = {
  mode: 'development',
  target: 'node',
  entry: {
    app: './src/index.js'
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
    },
  },
  },

  plugins: [
      new MiniCssExtractPlugin({
            filename:'main.bundle.css',
          }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'head',
        'files': {
          'css': [ '[name].bundle.css' ],
          'js': [ '[name].bundle.js'],
          'chunks': {
            'head': {
              'entry': '',
              'css': '[name].bundle.css'
            },
          }
        }
      }),
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
            { from: "src/img", to: "img" },
          ],
        }),
  ],

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [path.resolve(__dirname, 'src')],
      loader: 'babel-loader'
    }, {
      test: /.(sa|sc|c)ss$/,

      use: [{
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: "css-loader",

        options: {
          sourceMap: true
        }
      }, {
        loader: "sass-loader",
        options: {
          sourceMap: true
        }
      }]
    },  {

      test: /\.png/,

      type: 'asset/resource'

    }]
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
}