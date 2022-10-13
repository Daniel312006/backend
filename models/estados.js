const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const estadosSchema = new Schema({
    nombre: { type: String, required: true },
    estado: { type: Boolean, default: true },
    fechaCreacion: { type: Date, default: Date.now },
    fechaActualizacion: { type: Date, default: Date.now },    
}, {
    versionKey: false
});

module.exports = mongoose.model("Estado", estadosSchema);