var express = require('express')
  , hogan = require('hogan-express');

module.exports = function(app, config, passport) {

  app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.compress());
    app.use(express.static(config.root + '/public'));
    app.set('port', config.port);
    app.set('views', config.root + '/app/views');

    app.set('view engine', 'html');
    app.set('layout', 'application');
    app.set('view cache');
    app.engine('html', hogan);

    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(express.session({ secret: 'wat' }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(app.router);
    app.use(function(req, res) {
      res.status(404).render('404', { title: '404' });
    });

    app.locals({
      appname: 'Node Boilerplate'
    });

    app.configure('development', function () {
      app.locals.pretty = true;
    });
  });
};
