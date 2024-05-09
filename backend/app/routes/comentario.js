const express = require('express');
const router = express.Router();
const { crearComentario, editarComentario, eliminarComentario } = require('../controllers/comentario');

// Ruta para crear un comentario en una publicación específica
router.post('/publicaciones/:id/comentarios', crearComentario);

// Ruta para editar un comentario en una publicación específica
router.put('/publicaciones/:id/comentarios/:comentarioId', editarComentario);

// Ruta para eliminar un comentario en una publicación específica
router.delete('/publicaciones/:id/comentarios/:comentarioId', eliminarComentario);

module.exports = router;
