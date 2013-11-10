var statics = require('../app/controllers/statics')
  , users = require('../app/controllers/users')
  , auth = require('./middlewares/authorization');

module.exports = function(app, passport){
  app.get('/', statics.index);
  app.get('/logout', users.logout);
  app.get('/signin', users.signin);
  app.get('/signup', users.signup);
  app.get('/users', users.index);
  app.post('/users', users.create);
  app.post('/users/session',
    passport.authenticate('local', {
      failureRedirect: '/',
    }), users.session)
  app.get('/profile', auth.requiresAuth, users.profile);
  app.post('/users/edit', auth.requiresAuth, users.update);
};
