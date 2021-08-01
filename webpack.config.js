const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    assetModuleFilename: 'assets/images/[hash][ext][query]'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [MiniCSSExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.png$/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
            name: '[name].[ext]',
            outputPath: './assets/fonts/',
            publicPath: './assets/fonts/',
            esModule: false
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html',
      minify: 'auto'
    }),
    new MiniCSSExtractPlugin({
      filename: './index.css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'assets/images'),
          to: 'assets/images'
        }
      ]
    })
  ]
}
