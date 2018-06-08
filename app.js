/*express*/
const express = require('express');
const path = require('path');
const routes = require('./routes/index');
/*libreria body-parser*/
const bodyParser = require('body-parser');

const app = express();

app.set('views', path.join(__dirname, 'views'));
/*motor de plantillas pug*/
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
/*para poder usar los archivos que esten dentro de la carpeta publics*/
app.use(express.static('public'));
module.exports = app;