const TipoEquipo = require('../models/tipoEquipo')
const { request, response } = require('express')
/**
 * Crear un tipo de equipo
 */
const createTipoEquipo = async (req, res) => {
    try{
        const nombre = (req.body.nombre)
        ? req.body.nombre.toUpperCase()
        : '';
        const tipoEquipoBD = await TipoEquipo.findOne({ nombre })
        if (tipoEquipoBD){
            return res.status(400).json({msg: 'Ya existe un nombre'})
        }
        const datos = {
            nombre
        }
        const tipoEquipo = new TipoEquipo(datos)
        console.log(tipoEquipo)
        await tipoEquipo.save()
        res.status(201).json(tipoEquipo)
    }catch(e){
        console.log(e)
        return res.status(500).json({
            msg: "Error: " + e
        })
    }   
}

/**
 * Consultar todos tipos los equipo
 */
const getTiposEquipo = async (req = request, res = response) => {
    
    try{
        const tipoequiposDB = await TipoEquipo.find()
        const tipoEquipoFilter = tipoequiposDB.filter(TipoEquipo => TipoEquipo.estado === true)
        
        return res.json(tipoEquipoFilter)        
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})
    }     
}

/**
 * Consultar un tipo de equipo por su ID
 */
const getTipoEquipoByID = async (req, res) => {
    try{       
        console.log(req.params)        
        const id = req.params.id
        const query = { _id: id}
        const tipoequipoDB = await TipoEquipo.findOne(query)
        return res.json(tipoequipoDB)
    }catch (e){
        console.log(e)
        return res.status(500).json({msg: e})       
    }
}

/**
 * Actualizar un tipo de equipo por ID
 */
 const updateTipoEquipoByID = async (req = request,
    res = response) => {
    try{
        console.log(req.body)
        console.log(req.params)
        const data = req.body
        const id = req.params.id
        data.fechaActualizacion = new Date()
        console.log(data)
        const tipoEquipo = await TipoEquipo.findByIdAndUpdate(id, data, {new: true})
        return res.json(tipoEquipo)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})
    }    
}

/**
 * eliminar un tipo de equipo por su ID
 */
 const deleteTipoEquipoByID = async (req = request,
    res = response) => {
    try{
        console.log(req.params)
        const id = req.params.id
        const tipoequipoDB = await TipoEquipo.findById(id)
        if (!tipoequipoDB) {
            return res.status(404).json ({msg: 'No existe el tipo de equipo'})
        }
        await TipoEquipo.findByIdAndDelete(id)
        return res.status(204).json({msg: 'Borrado', id})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})
    }
}

module.exports = {
    createTipoEquipo,
    getTiposEquipo,
    getTipoEquipoByID,
    updateTipoEquipoByID,
    deleteTipoEquipoByID
}