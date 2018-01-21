const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const distPath = path.resolve(__dirname, '../public/dist');

module.exports = {
  entry: ['./client/index.js', 'webpack-hot-middleware/client?reload=true'],
  output: {
    path: distPath,
    filename: 'bundle.js',
    publicPath: '/dist'
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(distPath, {
      root: path.resolve(__dirname, '../')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
