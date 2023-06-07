const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const app = express();
const port = 3002;
const secretKey = 'miClaveSecreta'; // Reemplaza 'miClaveSecreta' por tu propia clave secreta

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.get('/', (req, res) => {
  res.send({ message: 'Bienvenido a Michelle Alexa Guereque Santillan con Node.js Express REST API!' });
});

routes(app, jwt, secretKey);

const server = app.listen(port, () => {
  console.log(`El servidor escucha en el puerto ${server.address().port}`);
});
