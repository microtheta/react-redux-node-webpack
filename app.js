const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webPakcConfig = require('./webpack/webpack.config.js');

const compiler = webpack(webPakcConfig);

const config = {
  RENDER_ON_SERVER: true
};

const app = require('./server');

const server = app(config);

server.use(webpackDevMiddleware(compiler, {
  publicPath: webPakcConfig.output.publicPath
}));

server.use(webpackHotMiddleware(compiler));
