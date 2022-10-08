const { Router } = require('express')
const {
    createEstado,
    getEstados,
    getEstadoByID,
    updateEstadoByID,
    deleteEstadoByID 
} = require('../controllers/estado')

 const router = Router()

 /**
  * Crear un de estado
  */
 router.post('/', createEstado)

 /**
  * Consulta todos los estados
  */
  router.get('/', getEstados)

  /**
  * Consulta un estado por su ID
  */
   router.get('/:id', getEstadoByID)

   /**
  * Actualiza un estado por su ID
  */
    router.put('/:id', updateEstadoByID)

    /**
  * Elimina un estado por su ID
  */
   router.delete('/:id', deleteEstadoByID)

module.exports = router   