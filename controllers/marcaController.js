const Marca = require('../models/marcas');
const { validationResult } = require('express-validator');

// GET
const getMarcas = async (req, res) => {
    try {
        // filtrar por estado
        let status = req.query.estado;
        let marcas = await Marca.find({ estado: status });
        res.json(marcas);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// GET ONE
const getMarca = async (req, res) => {
    try {        
        let marca = await Marca.findById(req.params.id);
        if (!marca) {
            return res.status(404).json({ msg: 'Marca no encontrada' });
        }
        res.json(marca);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

// POST
const createMarca = async (req, res) => {
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

        const marca = new Marca(data);
        await marca.save();
        res.json(marca);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// PUT
const updateMarca = async (req, res) => {
    // revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // extraer la informacion del proyecto
    const { nombre, estado } = req.body;
    
    const newMarca = {
        nombre: nombre.toUpperCase(),
        estado,
        fechaActualizacion: Date.now()
    };

    try {
        // revisar el ID
        let marca = await Marca.findById(req.params.id);

        // si existe o no
        if (!marca) {
            return res.status(404).json({ msg: 'Marca no encontrada' });
        }

        // actualizar
        marca = await Marca.findByIdAndUpdate({ _id: req.params.id }, { $set: newMarca }, { new: true });
        res.json({ marca });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

// DELETE
const deleteMarca = async (req, res) => {
    try {
        // revisar el ID
        let marca = await Marca.findById(req.params.id);

        // si existe o no
        if (!marca) {
            return res.status(404).json({ msg: 'Marca no encontrado' });
        }

        // eliminar
        await Marca.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Marca eliminado' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

module.exports = {
    getMarcas, getMarca, createMarca, updateMarca, deleteMarca
}