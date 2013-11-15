var mongoose = require('mongoose');

module.exports = {
  index: function(request, response){
    response.render('index', {
      title: 'Sample App', 
      user: request.user,
      partials: { outlet: '_banner' }
    });
  }
};
