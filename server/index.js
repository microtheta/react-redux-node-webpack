module.exports = function(config) {
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

  /**
   * Create Express server.
   */
  const app = express();

  /**
   * Express configuration.
   */
  app.set('host', config.HOST || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
  app.set('port', config.PORT || process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8081);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
  app.use(expressStatusMonitor());
  app.use(compression());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 }));

  app.get('/ping', (req, res) => {
    res.end('Pong');
  });

  app.get('/', (req, res) => {
    const assetsManifest = require('../public/dist/manifest.json');

    res.render('home', {
      title: 'Home',
      assets: assetsManifest
    });
  });

  /**
   * Error Handler.
   */
  app.use(errorHandler());

  /**
   * Start Express server.
   */
  app.listen(app.get('port'), () => {
    console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
  });
  return app;
}
