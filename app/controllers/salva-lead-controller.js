var express = require('express');
var mongoose = require('mongoose');
var validator = require("email-validator");
var nodemailer = require('nodemailer');
var emailExistence = require('email-existence');


var Schema = mongoose.Schema;

var router = express.Router();

module.exports = function (app) {
  app.use('/salvalead', router);
};

var LeadSchema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  ip: { type: String, required: true },
  data: { type: Number },
  email_existence: { type: Boolean }
});

var Lead = mongoose.model('Lead', LeadSchema);

router.post('/', function (req, res, next) {
  var nome = req.body.nome;
  var email = req.body.email;
  var data = new Date().getTime();
  var ip = "";
  var email_existence = false;
  var erro = { message: "" };

  console.log('received post: { nome: ' + nome + ', email: ' + email + ' }');

  if (req.headers['x-forwarded-for']) {
    ip = req.headers['x-forwarded-for'].split(",")[0];
  } else if (req.connection && req.connection.remoteAddress) {
    ip = req.connection.remoteAddress;
  } else {
    ip = req.ip;
  }

  console.log('validando quantidade de caracteres...');

  if (nome.length < 3 || email.length < 3) {
    erro.message = "Email e nome devem ter mais de 3 caracteres";
    erro.submessage = "";

    console.log('erro na quantidade de caracteres:', erro.message);

    res.render('index', {
      title: 'Home',
      erro: { message: erro.message, submessage: erro.submessage }
    });

    return;
  } // ./if nome e email

  console.log('validando email:', email);

  // verifica se o padrão do email é valido
  if (!validator.validate(email)) {
    erro.message = "Por favor, digite um e-mail válido";
    erro.submessage = "";

    console.log('erro ao validar email:', erro.message);

    res.render('index', {
      title: 'Home',
      erro: { message: erro.message, submessage: erro.submessage }
    });

    return;
  }

  // verifica se a conta de email existe
  emailExistence.check(email, function (err, emailExiste) {
    console.log('email existence response: ' + emailExiste);
    email_existence = emailExiste;
    salvalead();
  }); // ./email_existense

  function salvalead() {
    var newLead = new Lead({
      nome: nome,
      email: email,
      ip: ip,
      data: data,
      email_existence: email_existence
    });

    var dataLocal = Date(data).toLocaleString();

    console.log('data:', dataLocal);

    console.log('lead:', newLead);

    newLead.save(function (e) {
      if (e) {
        console.log(e.message);

        if (e.message.indexOf('E11000') > -1) {
          erro.message = "Este e-mail já está cadastrado";
          erro.submessage = "";
        } else {
          erro.messsubmessageage = "Não foi possível fazer o registro. Por favor tente novamente";
          erro.submessage = "";
        }

        console.log('erro ao tentar salvar o lead:', erro.message);

        res.render('index', {
          title: 'Home',
          erro: { message: erro.message, submessage: erro.submessage }
        });

        return;

      } else {
        console.log('Lead salvo no banco! Enviando email de obrigado para ' + email);

        sendMail(nome, email);

        console.log('Awesome: 1 more lead has been saved successfully :)');

        res.redirect('obrigado');

        return;
      }
    }); // ./newLead.save()
  } // ./function salvaLead()

  function sendMail(nome, email) {

    var transporter = nodemailer.createTransport("SMTP", {
      service: "Zoho",  // sets automatically host, port and connection security settings
      auth: {
        user: "contato@dodrive.com.br",
        pass: "a123456z"
      }
    });

    var mailOptions = {
      from: '"DoDrive" <contato@dodrive.com.br>',
      to: email, // list of receivers 
      subject: 'Felipe do DoDrive - Obrigado',
      html: 'Olá, ' + nome + '.<br><br><b>Obrigado</b> pelo cadastro. Logo retornaremos com mais informações.<br><br><br>Equipe <b>DoDrive</b><br>contato@dodrive.com.br'
    };

    transporter.sendMail(mailOptions, function (er, info) {
      if (er) {
        console.log('Erro ao tentar enviar email para: ' + nome + ' - ' + email, er);
      }

      console.log('Message sent to ' + email + ': ' + info.messageId);
      console.log('Message sent to ' + email + ': ' + info.message);

      transporter.close();
    }); // ./transporter.sed
  } // ./function sendMail
}); // ./router.post
