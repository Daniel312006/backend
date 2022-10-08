const Estado = require('../models/estado')
const { request, response} = require('express')
/**
 * Crear un estado de equipo
 */
const createEstado = async (req = request,
    res = response) => {
        try{
            const nombre = (req.body.nombre)
            ? req.body.nombre.toUpperCase()
            : '';

            const estadoBD = await Estado.findOne({ nombre })
            if(estadoBD){
                return res.status(400).json({msg: 'Ya este nombre existe'})
            }
            const datos = {
                nombre
            }
            const estado = new Estado(datos)
            console.log(estado)
            await estado.save()
            res.status(201).json(estado)
        }catch(e){
            console.log(e)
            return res.status(500).json({
                msg: e
            })
        }
    }

    /**
     * consultar todos los estados de equipo
     */
    const getEstados = async (req = request,
        res = response) => {
        try{
            const estadosDB = await Estado.find()
            const estados = estadosDB.filter(Estado => Estado.estado === true)
            return res.json(estados)
        }catch(e){
            console.log(e)
            return res.status(500).json({msg: e})
        }
    }

    /**
    * Consultar un estado por su ID
    */
    const getEstadoByID = async (req = request,
        res = response) => {
        try{
            //console.log(req.query)
            console.log(req.params)
            //const estado = req.query.estado
            const id = req.params.id
            const query = {_id: id}
            const estadoDB = await Estado.findOne(query)
            return res.json(estadoDB)
        }catch(e){
            console.log(e)
            return res.status(500).json({msg: e})
            }
        }

        /**
        * Actualizar un estado por su ID
        */
        const updateEstadoByID = async (req = request,
            res = response) => {
            try{
                console.log(req.body)
                console.log(req.params)
                const data = req.body
                const id = req.params.id
                data.fechaActualizacion = new Date()
                const estado = await Estado.findByIdAndUpdate(id, data, {new: true})
                return res.json(estado)
                }catch(e){
                    console.log(e)
                    return res.status(500).json({msg: e})
                }
        }

        /**
         * Borrar un estado por su ID
         */
        const deleteEstadoByID = async (req = request,
            res = response) => {
            try{
                console.log(req.params)
                const id = req.params.id
                const estadoDB = await Estado.findById(id)
                if(!estadoDB){
                    return res.status(404).json({msg: 'No existe el estado'})
                }
                await Estado.findByIdAndDelete(id)
                return res.status(204).json({msg: 'Registro de estado borrado', id})
            }catch(e){
                console.log(e)
                return res.status(500).json({msg: e})
            }    
        }

        module.exports = {
            createEstado,
            getEstados,
            getEstadoByID,
            updateEstadoByID,
            deleteEstadoByID
        }