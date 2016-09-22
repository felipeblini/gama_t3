var express = require('express'),
  router = express.Router();

module.exports = function (app) {
  app.use('/index2', router);
};

router.get('/', function (req, res, next) {
    res.render('index2', {
      title: 'Home'
  });
});



