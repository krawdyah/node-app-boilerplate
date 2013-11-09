var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'app'
    },
    port: 4000,
    db: 'mongodb://localhost/app-dev'
  },

  test: {
    root: rootPath,
    app: {
      name: 'app'
    },
    port: 4000,
    db: 'mongodb://localhost/app-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'app'
    },
    port: process.env.OPENSHIFT_NODEJS_PORT,
    db: process.env.OPENSHIFT_MONGODB_DB_URL
  }
};

module.exports = config[env];
