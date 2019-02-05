const path = require('path');
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
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
      main: ['babel-polyfill', './src/main.js'],
      login:  ['babel-polyfill','./src/login.js'],
      ds: ['babel-polyfill','./src/ds.js'],
      storage: ['babel-polyfill', './src/storage.js']
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
          chunks: ['login'],
          template: '!ejs-loader!src/assets/index.html'
      }),
      new HtmlWebpackPlugin({
          filename: 'login/index.html',
          chunks: ['main'],
          inject: true,
          template: 'src/assets/login.html'
      }),
      new HtmlWebpackPlugin({
          filename: 'ds/index.html',
          chunks: ['ds'],
          inject: true,
          template: '!!html-loader!ejs-loader!src/assets/ds.html'
      }),
      new HtmlWebpackPlugin({
          filename: 'storage/index.html',
          chunks: ['storage'],
          inject: true,
          template: '!!html-loader!ejs-loader!src/assets/storage.html'
      }),
      new MiniCssExtractPlugin({
          filename: "[name].css"
      }),
      new FaviconsWebpackPlugin('./src/assets/ra21icon.svg')
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
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
            test: /\.(xml|png|svg)$/,
            loader: 'file-loader'
         },
         {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader',
            options: {
                limit: 8192,
                name:'[name].[ext]',
                outputPath:'assets' //the icons will be stored in dist/assets folder
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
