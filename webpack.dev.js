const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack");
const path = require('path');
const apiMocker = require('mocker-api');

module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
   devServer: {
       contentBase: './dist',
       port: 9000,
       before(ds) {
           apiMocker(ds, path.resolve('./mocker/index.js'), {
               proxy: {
                   '/entities/*': 'http://localhost:8080/'
               },
               changeHost: true
           })
       }
   },
   plugins: [new webpack.EnvironmentPlugin({
       BASE_URL: 'http://localhost:9000/',
       COMPONENT_URL: 'http://localhost:9000/cta/',
       MDQ_URL: '/entities/',
       PERSISTENCE_URL: 'http://localhost:9000/ps/',
       SEARCH_URL: '/entities/',
       STORAGE_DOMAIN: 'localhost:9000',
       LOGLEVEL: 'warn'
  })]
});
