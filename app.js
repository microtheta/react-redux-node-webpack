const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webPackConfig = require('./webpack/webpack.dev.config.js');

const config = {
  RENDER_ON_SERVER: true
};

const app = require('./server');
const server = app(config);


if(process.env.NODE_ENV !== 'production') {

  const compiler = webpack(webPackConfig);

  server.use(webpackDevMiddleware(compiler, {
    publicPath: webPackConfig.output.publicPath
  }));

  server.use(webpackHotMiddleware(compiler));
}