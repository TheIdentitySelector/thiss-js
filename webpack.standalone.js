const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');


module.exports = merge(common, {
  mode: 'production',
  plugins: [new webpack.EnvironmentPlugin({
    BASE_URL: "https://${PUBLIC_HOSTNAME}/",
    COMPONENT_URL: 'https://${PUBLIC_HOSTNAME}/cta/',
    MDQ_URL: "${MDQ_URL}",
    PERSISTENCE_URL: 'https://${PUBLIC_HOSTNAME}/ps/',
    SEARCH_URL: "${SEARCH_URL}",
    STORAGE_DOMAIN: "${PUBLIC_HOSTNAME}",
    LOGLEVEL: 'error'
  })]
});
