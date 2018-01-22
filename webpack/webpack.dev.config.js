const merge = require('webpack-merge');
const sharedConfig = require('./webpack.shared.config.js');
const webpack = require('webpack');

const entryPath = typeof(sharedConfig.entry) == 'string' ? [sharedConfig.entry] : [];
entryPath.push('webpack-hot-middleware/client?reload=true');

module.exports = merge(sharedConfig, {
  entry: entryPath,

  devtool: 'inline-source-map',

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
})
