const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack");


module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
   devServer: {
       contentBase: './dist',
       port: 9000
   },
   plugins: [new webpack.EnvironmentPlugin({
       BASE_URL: 'http://localhost:9000/',
       COMPONENT_URL: 'http://localhost:9000/login/',
       MDQ_URL: 'http://localhost:8080/entities/',
       STORAGE_URL: 'http://localhost:9000/storage/',
       SEARCH_URL: 'http://localhost:8080/entities/',
       STORAGE_DOMAIN: 'localhost:9000'
  })]
});
