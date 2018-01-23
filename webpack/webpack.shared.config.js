const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const distPath = path.resolve(__dirname, '../public/dist');
const devEnv = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: ['./client/index.js'],

  output: {
    path: distPath,
    filename: 'bundle.js',
    publicPath: '/dist'
  },

  resolve: {
    extensions: [".js", ".css", ".scss"]
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: devEnv,
              },
            },
            { loader: 'sass-loader',
              options: {
                sourceMap: devEnv,
              },
            },
          ],
        }),
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {
              sourceMap: devEnv,
            },
          },
        }),
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
      /* {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=5000',
      }, */
    ],
  },


  plugins: [
    new CleanWebpackPlugin(distPath, {
      root: path.resolve(__dirname, '../')
    }),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true,
    })

  ]

};
