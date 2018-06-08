const path = require('path');
const mongoose = require('mongoose');
/*para autenticacion*/
const auth = require('http-auth');const express = require('express');
const { body, validationResult } = require('express-validator/check');

const router = express.Router();
const Registration = mongoose.model('Registration');

/*para usar la conexion a mongod*/
const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
});
/*formulario de registro*/
router.get('/', (req, res) => {
  res.render('form', { title: 'Formlulario de Registro' });
});
/*lista de registros*/
router.get('/registrations', auth.connect(basic), (req, res) => {
  Registration.find()
    .then((registrations) => {
      res.render('index', { title: 'Lista de Registros', registrations });
    })
    .catch(() => { res.send('Disculpe, algo salio mal'); });
});
/*Post para registro*/
router.post('/',
	[
	body('name')
	.isLength({ min: 1 })
	.withMessage('Por favor ingrese un nombre'),
	body('email')
	.isLength({ min: 1 })
	.withMessage('Por favor ingrese un nombre'),
	],
	(req, res) => {
		 const errors = validationResult(req);

    if (errors.isEmpty()) {
      const registration = new Registration(req.body);
      registration.save()
        .then(() => { res.send('Muchas gracias por tu registro!'); })
        .catch(() => { res.send('Disculpe, algo salio mal.'); });
    } else {
      res.render('form', {
        title: 'Formulario de Registro',
        errors: errors.array(),
        data: req.body,
      });
    }
  }
);

module.exports = router;