const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');


module.exports = merge(common, {
  mode: 'production',
  plugins: [new webpack.EnvironmentPlugin({
    BASE_URL: "https://use.thiss.io/",
    COMPONENT_URL: 'https://use.thiss.io/cta/',
    MDQ_URL: "https://md.thiss.io/entities/",
    PERSISTENCE_URL: 'https://use.thiss.io/ps/',
    SEARCH_URL: "https://md.thiss.io/entities/",
    STORAGE_DOMAIN: "use.this.io",
    LOGLEVEL: 'error'
  })]
});
