const express = require('express');
const router = express.Router();
const {
  compartirPublicacion,
  eliminarCompartido
} = require('../controllers/compartidos');

// Rutas para compartir y eliminar compartidos
router.post('/publicaciones/compartir', compartirPublicacion);
router.delete('/publicaciones/:id/compartido', eliminarCompartido);

module.exports = router;
