const { Router } = require('express');
const controladorEdifiaciones = require('../controller/edificaciones.controller');
const router = Router();

router.get('/', controladorEdifiaciones.obtenerEdificaciones);
router.get('/:edificacionID', controladorEdifiaciones.obtenerEdificacionId);
router.post('/', controladorEdifiaciones.crearEdificacion);
router.put('/:edificacionID', controladorEdifiaciones.modificarEdificacion);
router.delete('/:edificacionID', controladorEdifiaciones.destruirEdificacion);
module.exports = router;
