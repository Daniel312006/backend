const Inventario = require("../models/inventarios");
const Usuario = require("../models/usuarios");
const TipoEquipo = require("../models/tipos");
const Marca = require("../models/marcas");
const Estado = require("../models/estados");
const { validationResult } = require("express-validator");

// GET
const getInventarios = async (req, res) => {
  try {    
    let inventarios = await Inventario.find()
      .populate("usuario", "nombre")
      .populate("tipoEquipo", "nombre")
      .populate("marca", "nombre")
      .populate("estado", "nombre");

    // filtrar por estado: true
    let usuarios = await Usuario.find({ estado: true });
    let tipos = await TipoEquipo.find({ estado: true });
    let marcas = await Marca.find({ estado: true });
    let estados = await Estado.find({ estado: true });

    res.json({ inventarios, usuarios, tipos, marcas, estados });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// GET ONE
const getInventario = async (req, res) => {
  try {
    let inventario = await Inventario.findById(req.params.id)
      .populate("usuario", "nombre")
      .populate("tipoEquipo", "nombre")
      .populate("marca", "nombre")
      .populate("estado", "nombre");
    if (!inventario) {
      return res.status(404).json({ msg: "Inventario no encontrado" });
    }
    res.json(inventario);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};

// POST
const createInventario = async (req, res) => {
  // revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // deseestructurar el request object en string    
    const data = JSON.parse(JSON.stringify(req.body));

    // crear un nuevo inventario
    const inventario = new Inventario({
      descripcion: data.descripcion,
      foto: data.foto,
      color: data.color,
      fechaCompra: data.fechaCompra,
      precio: data.precio,
      usuario: data.usuario,
      marca: data.marca,
      estado: data.estado,
      tipoEquipo: data.tipoEquipo,
      serial: data.serial,
      modelo: data.modelo,
    });

    // guardar el inventario en la base de datos
    inventario.save();
    res.json({
      ok: true,
      status: 200,
      inventario,
      msg: "Inventario creado correctamente"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// PUT
const updateInventario = async (req, res) => {
  // revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // extraer la informacion del proyecto
  const inventarioUpdate = JSON.parse(JSON.stringify(req.body));

  // extraer el inventario y revisar si existe
  const { id } = req.params;

  try {
    // revisar el ID
    let inventario = await Inventario.findById(id);

    // si existe o no
    if (!inventario) {
      return res.status(404).json({ msg: "Inventario no encontrado" });
    }

    // actualizar
    inventario = await Inventario.findByIdAndUpdate(
      { _id: id },
      { $set: inventarioUpdate },
      { new: true }
    );
    res.json({
      ok: true,
      status: 200, 
      inventario,
      msg: "Inventario actualizado"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor", error);
  }
};

// DELETE
const deleteInventario = async (req, res) => {
  try {
    // revisar el ID
    let inventario = await Inventario.findById(req.params.id);

    // si existe o no
    if (!inventario) {
      return res.status(404).json({ msg: "Inventario no encontrado" });
    }

    // eliminar el registro
    await Inventario.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Inventario eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};

module.exports = {
  getInventarios,
  getInventario,
  createInventario,
  updateInventario,
  deleteInventario,
};
