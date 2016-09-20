var express = require('express');
var config = require('./config/config');
//var glob = require('glob'),
var mongoose = require('mongoose');

mongoose.connect(config.db);
var db = mongoose.connection;

db.on('connected', function() {
  console.log('MongoDb connected');
});

db.on('disconnected', function() {
  console.log('MongoDb disconnected');
});

db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

process.on('SIGINT', function() {
  db.close(function() {
    console.log('MongoDb has been disconnected by thr end of the app');
    process.exit(0);
  });
});

// var models = glob.sync(config.root + '/app/models/*.js');
// models.forEach(function (model) {
//   require(model);
// });

var app = express();

require('./config/express')(app, config);

app.listen(config.port, () => {
    console.log(`App is running on port ${ config.port }`);
});

