const express = require('express');
const router = express.Router();
const {
  compartirPublicacion,
  eliminarCompartido,
  obtenerCompartidos // Agregamos el controlador para obtener compartidos
} = require('../controllers/compartidos');

// Rutas para compartir, obtener y eliminar compartidos
router.post('/publicaciones/compartir', compartirPublicacion);
router.get('/publicaciones/compartidos', obtenerCompartidos); // Ruta para obtener compartidos
router.delete('/publicaciones/:id/compartido', eliminarCompartido);

module.exports = router;

