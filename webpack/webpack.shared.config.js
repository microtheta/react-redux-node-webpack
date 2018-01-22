const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');


const distPath = path.resolve(__dirname, '../public/dist');

module.exports = {
  entry: ['./client/index.js'],

  output: {
    path: distPath,
    filename: 'bundle.js',
    publicPath: '/dist'
  },


  plugins: [
    new CleanWebpackPlugin(distPath, {
      root: path.resolve(__dirname, '../')
    })
  ]

};
