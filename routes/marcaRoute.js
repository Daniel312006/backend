const { Router } = require('express');
const router = Router();

const { getMarcas, getMarca, createMarca, updateMarca, deleteMarca } = require('../controllers/marcaController');

router.get('/', getMarcas);
router.get('/:id', getMarca);
router.post('/', createMarca);
router.put('/:id', updateMarca);
router.delete('/:id', deleteMarca);

module.exports = router;