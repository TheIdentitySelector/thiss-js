const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack");
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
    devServer: {
        client: {
            logging: 'verbose',
            webSocketURL: 'ws://127.0.0.1:9000/ws',
            overlay: false,
        },
       allowedHosts: 'all',
       static: { directory: path.join(__dirname,'dist'), },
       port: 9000,
   },
   output: {
     publicPath: '/'
   },
   plugins: [
       new BundleAnalyzerPlugin(),
       new webpack.EnvironmentPlugin({
           BASE_URL: 'http://localhost:9000/',
           COMPONENT_URL: 'http://localhost:9000/cta/',
           MDQ_URL: '/entities/',
           PERSISTENCE_URL: 'http://localhost:9000/ps/',
           SEARCH_URL: '/entities/',
           STORAGE_DOMAIN: 'localhost:9000',
           LOGLEVEL: 'warn',
           DEFAULT_CONTEXT: 'thiss.io',
           MIN_SEARCH_LENGTH: '3'
  })]
});
