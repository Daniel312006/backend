const express = require('express');

const app = express(); // en esta linea se crea la instancia de express
const cors = require('cors')
const fileUpload = require('express-fileupload')

/**
 * importación de las rutas
 */
const tipoEquipo = require('./routes/tipoEquipo')
const estado = require('./routes/estado')
const marca = require('./routes/marca')
const usuario = require('./routes/usuario')
const inventario = require('./routes/inventario')

/**
 * middlewares: Es un software que se sitúa entre un sistema operativo y las aplicacionesque se
 * ejecutan en él. Básicamente, funciona como una capa de traducción oculta para permitir la 
 * comunicación y la administración de datos en aplicaciones distribuidas. 
 */
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/temp/'
}))

app.use(cors({
    origin: '*'
}))

/**
 * Utilizar los sustantivos en plural para una URI
 */
app.use('/api/tipoequipos', tipoEquipo)
app.use('/api/estados', estado)
app.use('/api/marcas', marca)
app.use('/api/usuarios', usuario)
app.use('/api/inventarios', inventario)

app.get("*", (req, res) => {
    return res.status(404).json({
        msg: 'Página no encontrada'
    });
});

module.exports = app;