const merge = require('webpack-merge');
const devConfig = require('./webpack.dev.config.js');
const prdConfig = require('./webpack.prd.config.js');
const baseConfig = require('./webpack.base.config.js');

module.exports = (mode) => {
  if (mode === 'development') {
    return merge(baseConfig, devConfig);
  } else if (mode === 'production') {
    return merge(baseConfig, prdConfig);
  }
  return merge(baseConfig);
};
