var mongoose = require('mongoose')
  , User = mongoose.model('User');

exports.index = function(request, response){
  response.setHeader("Content-Type", "application/json");

  User
    .find()
    .exec(function(err, data) {
      response.send({users: data});
    });
}

exports.signup = function(request, response){ 
  response.render('users/index', {
    title: 'Register Page',
    partials: { outlet: 'users/_signup' }
  }); 
}

exports.signin = function(request, response){
  response.render('users/index', {
    title: 'Login Page',
    partials: { outlet: 'users/_signin' }
  });
}

exports.logout = function (request, response) {
  request.logout()
  response.redirect('/')
}

exports.session = function (request, response) {
  if (!request.user) { return response.redirect('/login'); }
  response.redirect('/');
}

exports.update = function (request, response, next) {
  User.findById(request.user.id, 
    function(err, user){ 
      user.password = request.body.password 
      user.save(function (err, user) {
        if (err) { return next(err) }
        if (!user) { return next(new Error('Failed to load User ' + id)) }
      });
    });
  response.redirect('/')
}

exports.create = function (request, response) {
  var user = new User(request.body)
  user.save(function (err) {
    if (err) {
      console.log(err.errors);
      return response.render('index', {
        errors: err.errors,
        user: user,
        title: 'Sign Up'
      })
    }

    request.logIn(user, function(err) {
      if (err) { return next(err) }
      return response.redirect('/')
    })
  })
}

exports.profile = function (request, response) {
  response.setHeader("Content-Type", "application/json");

   User
    .findById(request.user._id)
    .exec(function(err, data) {
      if (err) { console.log(err) }
      response.send( JSON.stringify(data) );
    });
}

