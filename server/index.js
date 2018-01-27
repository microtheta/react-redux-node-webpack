const bodyParser = require('body-parser');
const compression = require('compression');
// const dotenv = require('dotenv');
const errorHandler = require('errorhandler');
const express = require('express');
const expressStatusMonitor = require('express-status-monitor');
const logger = require('morgan');
// const multer = require('multer');
// const upload = multer({ dest: path.join(__dirname, 'uploads') });
// const passport = require('passport');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webPackConfig = require('../webpack/webpack.dev.config.js');


module.exports = function server(config) {
  /**
   * Create Express server.
   */
  const app = express();

  /**
   * WebPack Hot module reloading
   */
  if(process.env.NODE_ENV !== 'production') {

    const compiler = webpack(webPackConfig);

    app.use(webpackDevMiddleware(compiler, {
      publicPath: webPackConfig.output.publicPath
    }));

    app.use(webpackHotMiddleware(compiler, {
    }));
  }

  /**
   * Express configuration.
   */

  app.use(express.static('public', { maxAge: 31557600000 }));

   app.set('host', config.HOST || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
  app.set('port', config.PORT || process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8081);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');

  app.use(expressStatusMonitor());
  app.use(compression());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/ping', (req, res) => {
    res.end('Pong');
  });

  /**
   * Error Handler.
   */
  app.use(errorHandler());

  /**
   * All other routes to be handled by react router
   */
  app.get('*', (req, res) => {
    const assetsManifest = require('../public/dist/manifest.json'); // eslint-disable-line

    res.render('layout', {
      title: 'Home',
      assets: assetsManifest
    });
  });


  /**
   * Start Express server.
   */
  app.listen(app.get('port'), () => {
    console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
  });
  return app;
};
