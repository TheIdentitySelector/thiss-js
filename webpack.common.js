const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  resolve: {
    alias: {
        'node_modules': path.join(__dirname, 'node_modules'),
        'bower_modules': path.join(__dirname, 'bower_modules'),
    }
  },
  entry: {
    thiss: './src/thiss.js',
  },
  plugins: [
     new CleanWebpackPlugin(['dist']),
     new HtmlWebpackPlugin({
       title: 'Production'
     }),
     new HtmlWebpackPlugin({
       filename: 'index.html',
       template: 'src/assets/index.html'
     }),
     new HtmlWebpackPlugin({
       filename: 'login.html',
       template: 'src/assets/login.html'
    }),
    new MiniCssExtractPlugin({
       filename: "[name].css"
    })
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
         use: [
            MiniCssExtractPlugin.loader,
            {
      loader: 'css-loader',
      options: {
        minimize: {
          safe: true
        }
      }
    }
         ]
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
         test: /\.(xml)$/,
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
