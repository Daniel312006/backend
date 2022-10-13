const Usuario = require('../models/usuarios');
const { validationResult } = require('express-validator');

// GET
const getUsuarios = async (req, res) => {
    try {
        // filtrar por estado
        let status = req.query.estado;
        let usuarios = await Usuario.find({ estado: status });
        res.json(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// GET ONE
const getUsuario = async (req, res) => {
    try {        
        let usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

// POST
const createUsuario = async (req, res) => {
    // revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // crear un nuevo registro       

        const data = {
            nombre: req.body.nombre,
            email: req.body.email,
        }

        const usuario = new Usuario(data);
        await usuario.save();
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// PUT
const updateUsuario = async (req, res) => {
    // revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // extraer la informacion del proyecto
    const { nombre, email, estado } = req.body;
    
    const newUsuario = {
        nombre,
        email,
        estado,
        fechaActualizacion: Date.now()
    };

    try {
        // revisar el ID
        let usuario = await Usuario.findById(req.params.id);

        // si existe o no
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // actualizar
        usuario = await Usuario.findByIdAndUpdate({ _id: req.params.id }, { $set: newUsuario }, { new: true });
        res.json({ usuario });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

// DELETE
const deleteUsuario = async (req, res) => {
    try {
        // revisar el ID
        let usuario = await Usuario.findById(req.params.id);

        // si existe o no
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // eliminar
        await Usuario.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Usuario eliminado' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

module.exports = {
    getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario
}