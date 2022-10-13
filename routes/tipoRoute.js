const { Router } = require('express');
const router = Router();

const { getTipoEquipos, getTipoEquipo, createTipoEquipo, updateTipoEquipo, deleteTipoEquipo } = require('../controllers/tipoController');

router.get('/', getTipoEquipos);
router.get('/:id', getTipoEquipo);
router.post('/', createTipoEquipo);
router.put('/:id', updateTipoEquipo);
router.delete('/:id', deleteTipoEquipo);

module.exports = router;