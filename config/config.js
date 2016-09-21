var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var port = process.env.PORT || 3000; //trocar por ||

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'cabify-time3'
    },
    port: port,
    db: 'mongodb://localhost/dodrive-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'cabify-time3'
    },
    port: port,
    db: 'mongodb://localhost/dodrive-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'cabify-time3'
    },
    port: port,
    db: 'mongodb://felipe:ga$$369@ds033116.mlab.com:33116/d4udb'
  }
};

module.exports = config[env];
