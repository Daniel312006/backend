const { Router } = require('express');
const router = Router();

const { getInventarios, getInventario, createInventario, updateInventario, deleteInventario } = require('../controllers/inventarioController');

router.get('/', getInventarios);
router.get('/:id', getInventario);
router.post('/', createInventario);
router.put('/:id', updateInventario);
router.delete('/:id', deleteInventario);

module.exports = router;