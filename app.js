// inicializando la aplicacion
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// importando rutas
const estadoRoute = require('./routes/estadoRoute');
const marcaRoute = require('./routes/marcaRoute');
const tipoRoute = require('./routes/tipoRoute');
const usuarioRoute = require('./routes/usuarioRoute');
const inventarioRoute = require('./routes/inventarioRoute');

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));

// rutas api
app.use('/api/estados', estadoRoute);
app.use('/api/marcas', marcaRoute);
app.use('/api/tipos', tipoRoute);
app.use('/api/usuarios', usuarioRoute);
app.use('/api/inventarios', inventarioRoute);

// 404
app.use((req, res, next) => {
  res.status(404).send('404 not found');
})

// exportando la aplicacion
module.exports = app;