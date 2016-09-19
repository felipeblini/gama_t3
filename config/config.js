var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'cabify-time3'
    },
    port: 9000,
    //db: 'mongodb://localhost/d4u-development'
    db: 'mongodb://felipe:ga$$369@ds033116.mlab.com:33116/d4udb'
  },

  test: {
    root: rootPath,
    app: {
      name: 'cabify-time3'
    },
    port: 3000,
    db: 'mongodb://localhost/d4u-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'cabify-time3'
    },
    port: 3000,
    db: 'mongodb://felipe:ga$$369@ds033116.mlab.com:33116/d4udb'
  }
};

module.exports = config[env];
