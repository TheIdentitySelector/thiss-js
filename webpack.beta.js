const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack");
const path = require('path');
const apiMocker = require('mocker-api');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
   devServer: {
       contentBase: './dist',
       port: 9000,
   },
   plugins: [
       new BundleAnalyzerPlugin(),
       new webpack.EnvironmentPlugin({
       BASE_URL: 'http://localhost:9000/',
       COMPONENT_URL: 'http://localhost:9000/cta/',
       MDQ_URL: 'https://md.thiss.io/entities/',
       PERSISTENCE_URL: 'http://localhost:9000/ps/',
       SEARCH_URL: 'https://md.thiss.io/entities/',
       STORAGE_DOMAIN: 'localhost:9000',
       LOGLEVEL: 'warn',
       DEFAULT_CONTEXT: 'thiss.io'
  })]
});
