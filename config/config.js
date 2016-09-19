var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  port: process.env.PORT || 3000,
  development: {
    root: rootPath,
    app: {
      name: 'cabify-time3'
    },
    port: this.port,
    //db: 'mongodb://localhost/d4u-development'
    db: 'mongodb://felipe:ga$$369@ds033116.mlab.com:33116/d4udb'
  },

  test: {
    root: rootPath,
    app: {
      name: 'cabify-time3'
    },
    port: this.port,
    db: 'mongodb://localhost/d4u-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'cabify-time3'
    },
    port: this.port,
    db: 'mongodb://felipe:ga$$369@ds033116.mlab.com:33116/d4udb'
  }
};

module.exports = config[env];
