const { Router } = require('express');
const router = Router();

const { getEstados, getEstado, createEstado, updateEstado, deleteEstado } = require('../controllers/estadoController');

router.get('/', getEstados);
router.get('/:id', getEstado);
router.post('/', createEstado);
router.put('/:id', updateEstado);
router.delete('/:id', deleteEstado);

module.exports = router;