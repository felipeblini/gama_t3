var express = require('express');
var config = require('./config/config');
//var glob = require('glob'),
var mongoose = require('mongoose');

mongoose.connect(config.db);
var db = mongoose.connection;

db.on('connected', function() { console.log('MongoDb connected at ' + config.db); });
db.on('disconnected', function() { console.log('MongoDb disconnected at ' + config.db); });

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

const PORT = config.port;

app.listen(PORT, () => {
    console.log(`App is running on port ${ PORT }`);
});

