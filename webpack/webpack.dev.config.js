const merge = require('webpack-merge');
const sharedConfig = require('./webpack.shared.config.js');
const webpack = require('webpack');

module.exports = merge(sharedConfig, {

  devtool: 'source-map',

  stats: {
    errorDetails: true
  },

  output: {
    pathinfo: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
});
