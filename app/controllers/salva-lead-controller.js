var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var router = express.Router();

module.exports = function (app) {
  app.use('/salvalead', router);
};

var LeadSchema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  ip: { type: String, required: true },
  data: { type: Number }
});

var Lead = mongoose.model('Lead', LeadSchema);

router.post('/', function (req, res, next) {

  var nome = req.body.nome;
  var email = req.body.email;

  var ip;

  if (req.headers['x-forwarded-for']) {
      ip = req.headers['x-forwarded-for'].split(",")[0];
  } else if (req.connection && req.connection.remoteAddress) {
      ip = req.connection.remoteAddress;
  } else {
      ip = req.ip;
  }
  
  console.log("client IP is: " + ip);

  var data = new Date().getTime();
  
  var lead = new Lead({
    nome: nome,
    email: email,
    ip: ip,
    data: data 
  });

  var dataLocal = Date(data).toLocaleString();

  console.log('data', dataLocal);

  console.log(lead);

  lead.save(function(err) {
    if (err) {
      console.log(err.message);

      if(err.message.indexOf('E11000') > -1) {
        err.message = "Este e-mail já está cadastrado";
      }
      else {
        err.message = "Algum dado está incorreto";
      }

      res.render('index', {
        title: 'Home',
        erro: err.message
      });
    }
    else {
      console.log('save lead successfully...');

      res.render('obrigado', {
        title: 'Obrigado'
      });
    }
  });
});