const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack");
const path = require('path');
const apiMocker = require('mocker-api');
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
       setupMiddlewares(mw, ds) {

           mw.push(
               apiMocker(ds.app, path.resolve('./mocker/index.js'), {
                   proxy: {
                       '/': 'http://127.0.0.1:8080/',
                       secure: false,
                       changeOrigin: true,
                   },
                   changeHost: true,
               })
           );
           return mw;
       }
   },
   plugins: [
       new BundleAnalyzerPlugin(),
       new webpack.EnvironmentPlugin({
           BASE_URL: 'http://localhost:9000/',
           COMPONENT_URL: 'http://localhost:9000/cta/',
           MDQ_URL: 'http://localhost:8080/entities/',
           PERSISTENCE_URL: 'http://localhost:9000/ps/',
           SEARCH_URL: 'http://localhost:8080/entities/',
           STORAGE_DOMAIN: 'localhost:9000',
           LOGLEVEL: 'warn',
           DEFAULT_CONTEXT: 'thiss.io'
  })]
});
