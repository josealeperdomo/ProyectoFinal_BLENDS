const express = require('express');
const router = express.Router();
const {
  mostrarPublicaciones,
  mostrarPublicacion,
  crearPublicacion,
  editarPublicacion,
  eliminarPublicacion,
  obtenerPublicacionesPorUsuarioId
} = require('../controllers/publicaciones');

// Ruta para mostrar todas las publicaciones
router.get('/all', mostrarPublicaciones);

// Ruta para mostrar una publicación específica
router.get('/:id', mostrarPublicacion);

// Ruta para crear una nueva publicación
router.post('/', crearPublicacion);

// Ruta para editar una publicación existente
router.put('/:id', editarPublicacion);

// Ruta para eliminar una publicación
router.delete('/:id', eliminarPublicacion);

router.get('/user/:userId', obtenerPublicacionesPorUsuarioId)

module.exports = router;
