var mongoose = require('mongoose');

exports.requiresAuth = function (request, response, next) {
  if (!request.isAuthenticated()) {
    request.session.returnTo = request.originalUrl
    return response.redirect('/login')
  }
  next()
}

