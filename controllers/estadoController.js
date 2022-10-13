const Estado = require('../models/estados');
const { validationResult } = require('express-validator');

// GET
const getEstados = async (req, res) => {
    try {
        // filtrar por estado
        let estado = req.query.estado;
        let estados = await Estado.find({ estado: estado });
        res.json(estados);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// GET ONE
const getEstado = async (req, res) => {
    try {        
        let estado = await Estado.findById(req.params.id);
        if (!estado) {
            return res.status(404).json({ msg: 'Estado no encontrado' });
        }
        res.json(estado);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

// POST
const createEstado = async (req, res) => {
    // revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // crear un nuevo estado
        const nombre = req.body.nombre.toUpperCase();

        const data = {
            nombre,
        }

        const estado = new Estado(data);
        await estado.save();
        res.json(estado);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// PUT
const updateEstado = async (req, res) => {
    // revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // extraer la informacion del proyecto
    const { nombre, estado } = req.body;
    
    const newEstado = {
        nombre: nombre.toUpperCase(),
        estado,
        fechaActualizacion: Date.now()
    };

    try {
        // revisar el ID
        let estado = await Estado.findById(req.params.id);

        // si el estado existe o no
        if (!estado) {
            return res.status(404).json({ msg: 'Estado no encontrado' });
        }

        // actualizar
        estado = await Estado.findByIdAndUpdate({ _id: req.params.id }, { $set: newEstado }, { new: true });
        res.json({ estado });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

// DELETE
const deleteEstado = async (req, res) => {
    try {
        // revisar el ID
        let estado = await Estado.findById(req.params.id);

        // si el estado existe o no
        if (!estado) {
            return res.status(404).json({ msg: 'Estado no encontrado' });
        }

        // eliminar el estado
        await Estado.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Estado eliminado' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

module.exports = {
    getEstados, getEstado, createEstado, updateEstado, deleteEstado
}