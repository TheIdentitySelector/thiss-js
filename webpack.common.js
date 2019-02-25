const path = require('path');
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const GoogleFontsPlugin = require("@beyonk/google-fonts-webpack-plugin");
const DotEnv = require("dotenv-webpack");

require("babel-polyfill");

module.exports = {
  resolve: {
    alias: {
        'node_modules': path.join(__dirname, 'node_modules'),
        'bower_modules': path.join(__dirname, 'bower_modules'),
    }
  },
  entry: {
      index: ['babel-polyfill', './src/index.js'],
      cta:  ['babel-polyfill','./src/cta/index.js'],
      ds: ['babel-polyfill','./src/ds/index.js'],
      persit: ['babel-polyfill', './src/persist.js'],
      ps: ['babel-polyfill', './src/ps/index.js'],
      thiss: ['babel-polyfill', './src/component.js'],
      discovery: ['babel-polyfill', './src/discovery.js']
  },
  plugins: [
      new DotEnv({systemvars: true}),
      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery"
      }),
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
          filename: 'index.html',
          inject: true,
          chunks: ['index'],
          template: '!ejs-loader!src/index.html'
      }),
      new HtmlWebpackPlugin({
          filename: 'cta/index.html',
          chunks: ['cta'],
          inject: true,
          template: '!ejs-loader!src/cta/index.html'
      }),
      new HtmlWebpackPlugin({
          filename: 'ds/index.html',
          chunks: ['ds'],
          inject: true,
          template: '!ejs-loader!src/ds/index.html'
      }),
      new HtmlWebpackPlugin({
          filename: 'ps/index.html',
          chunks: ['ps'],
          inject: true,
          template: '!ejs-loader!src/ps/index.html'
      }),
      new MiniCssExtractPlugin({
          filename: "[name].css"
      }),
      new FaviconsWebpackPlugin('./src/assets/ra21icon.svg'),
      new GoogleFontsPlugin({
          fonts: [
				{ family: "Libre Franklin", variants: ['400', '700'], subsets: ['latin-ext'] },
          ],
          local: false
      })
  ],
  output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: "/",
      libraryTarget: 'umd',
      library: '[name]',
      globalObject: 'this'
  },
  module: {
     rules: [
         {
            test: /\.(css)$/,
            use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader']
         },
         {
             test: /\.(html)$/,
             use: {
                 loader: 'html-loader',
                 options: {
                     attrs: ['img:src',':data-src'],
                     options: {
                         minimize: true
                     }
                 }
             }
         },
         {
             test: /\.(woff(2)?|ttf|eot|svg|xml|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
             loader: 'url-loader',
             options: {
                 name:'[hash]_[name].[ext]',
                 outputPath:'assets'
             }
             },
         {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                }
            }
       }
     ]
   }
};
