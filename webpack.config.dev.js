const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const DotenvPlugin = require('dotenv-webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    assetModuleFilename: 'assets/images/[name][ext]'
  },
  mode: 'development',
  resolve: {
    extensions: ['.js'],
    alias: {
      '@utils': path.resolve(__dirname, './src/utils'),
      '@templates': path.resolve(__dirname, './src/templates'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@images': path.resolve(__dirname, './src/assets/images')
    }
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
            publicPath: './fonts/',
            esModule: false
          }
        },
        type: 'javascript/auto'
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
      filename: './assets/[name].css'
    }),
    new DotenvPlugin(),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: true
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CSSMinimizerPlugin(),
      new TerserPlugin()
    ]
  }
}
