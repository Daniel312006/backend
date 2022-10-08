//const express = require('express');
const app = require('./app')
const { mongoConn } = require('./databases/configuration')
const dotenv = require('dotenv').config()

app.set('port', process.env.PORT || 4000)

const conn = mongoConn()

app.listen(app.get('port'), () => {

    console.log(`Servidor arrancó por puerto ${app.get('port')}`);

});

/*const tipoEquipos = [
    {
        nombre: 'Cómputo',
        estado: true,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
    },
    {
        nombre: 'Móvil',
        estado: false,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
    }
]*/

/*app.get('/tipoequipos', (reu, res) => {
    return res.json(tipoEquipos);
});

app.listen(3000, () => {
    console.log('Servidor arrancó por el puerto 3000');
});*/