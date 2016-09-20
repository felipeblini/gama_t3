var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var exphbs  = require('express-handlebars');

module.exports = function(app, config) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  var environment = {
    // if it is running on localhost, environment.dev will be true
    // otherwise environment.dev will be false
    dev: !app.get('env') === 'development'
    // dev: !app.get('env') === 'development' -> uncomment to test the prod environment
  }

  var environmentRoot = environment.dev ? '/app' : '/www';

  //environmentRoot = '/app';

  console.log('environment:', environment.dev ? 'development' : 'production');
  console.log('serving on folder:', environmentRoot);
  
  app.engine('handlebars', exphbs({
    layoutsDir: config.root + environmentRoot + '/views/layouts/',
    defaultLayout: 'main',
    partialsDir: [config.root + environmentRoot + '/views/partials/']
  }));
  app.set('views', config.root + environmentRoot + '/views');
  app.set('view engine', 'handlebars');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());

  //environmentRoot += environment.dev ? '/assets' : '/views/assets';

  var staticFolder = environmentRoot + '/assets';

  console.log('static assets:', config.root + staticFolder);
  
  app.use(express.static(config.root + staticFolder));
  app.use(methodOverride());

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  app.use('/obrigado', function (req, res, next) {
    res.render('obrigado', {
      title: 'Obrigado'
    });
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  if(environment.dev){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });
};
