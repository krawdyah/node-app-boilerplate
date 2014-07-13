var express = require('express')
  , app = express()
  , morgan = require('morgan')
  , serveStatic = require('serve-static')
  , compression = require('compression')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , methodOverride = require('method-override')
  , hbs = require('hbs')
  , env = process.env.NODE_ENV || 'development';


module.exports = function(app, config, passport){

  app.use(morgan());
  app.use(compression());
  app.use(express.static(config.root + '/public'));

  app.set('port', config.port);

  app.set('view engine', 'hbs');
  app.engine('hbs', hbs.__express);
  app.set('views', config.root + '/app/views');
  app.set('view cache');

  app.use(cookieParser());
  app.use(bodyParser());
  app.use(methodOverride());
  app.use(session({ secret: 'wat' }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.locals.appname = 'Node Boilerplate';

}