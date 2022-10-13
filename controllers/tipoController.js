const TipoEquipo = require('../models/tipos');
const { validationResult } = require('express-validator');

// GET
const getTipoEquipos = async (req, res) => {
    try {
        // filtrar por estado
        let status = req.query.estado;
        let tipos = await TipoEquipo.find({ estado: status });
        res.json(tipos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// GET ONE
const getTipoEquipo = async (req, res) => {
    try {        
        let tipo = await TipoEquipo.findById(req.params.id);
        if (!tipo) {
            return res.status(404).json({ msg: 'Tipo de Equipo no encontrado' });
        }
        res.json(tipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

// POST
const createTipoEquipo = async (req, res) => {
    // revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // crear un nuevo registro
        const nombre = req.body.nombre.toUpperCase();

        const data = {
            nombre,
        }

        const tipo = new TipoEquipo(data);
        await tipo.save();
        res.json(tipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// PUT
const updateTipoEquipo = async (req, res) => {
    // revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // extraer la informacion del proyecto
    const { nombre, estado } = req.body;
        
    const newTipoEquipo = {
        nombre: nombre.toUpperCase(),
        estado,
        fechaActualizacion: Date.now()
    };

    try {
        // revisar el ID
        let tipo = await TipoEquipo.findById(req.params.id);

        // si existe o no
        if (!tipo) {
            return res.status(404).json({ msg: 'Tipo de Equipo no encontrado' });
        }

        // actualizar
        tipo = await TipoEquipo.findByIdAndUpdate({ _id: req.params.id }, { $set: newTipoEquipo }, { new: true });
        res.json({ tipo });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

// DELETE
const deleteTipoEquipo = async (req, res) => {
    try {
        // revisar el ID
        let tipo = await TipoEquipo.findById(req.params.id);

        // si existe o no
        if (!tipo) {
            return res.status(404).json({ msg: 'Tipo de Equipo no encontrado' });
        }

        // eliminar
        await TipoEquipo.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Tipo de Equipo eliminado' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

module.exports = {
    getTipoEquipos, getTipoEquipo, createTipoEquipo, updateTipoEquipo, deleteTipoEquipo
}