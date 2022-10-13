const { Router } = require('express');
const router = Router();

const { getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuarioController');

router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

module.exports = router;