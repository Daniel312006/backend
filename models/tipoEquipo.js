const { Schema, model } = require("mongoose");

const TipoEquipoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre de equipo requerido']
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    fechaCreacion:{
        type: Date,
        default: new Date()        
    },
    fechaActualizacion:{
        type: Date,
        default: new Date()        
    }
})
module.exports = model('TipoEquipo', TipoEquipoSchema)