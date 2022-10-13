const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventarioSchema = new Schema({
    serial: { type: String, required: [true, 'Serial requerido'], unique: true },
    modelo: { type: String, required: [true, 'Modelo requerido'], unique: true },
    descripcion: { type: String },
    foto: { type: String },
    color: { type: String },
    fechaCompra: { type: Date, default: Date.now },
    precio: { type: Number, default: 0 },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    estado: { type: Schema.Types.ObjectId, ref: 'Estado', required: true },
    marca: { type: Schema.Types.ObjectId, ref: 'Marca', required: true },
    tipoEquipo: { type: Schema.Types.ObjectId, ref: 'TipoEquipo', required: true },
}, {
    versionKey: false
});

module.exports = mongoose.model("Inventario", inventarioSchema);