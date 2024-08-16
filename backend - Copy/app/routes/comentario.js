const express = require('express');
const router = express.Router();
const {
  mostrarComentariosDePublicacion,
  crearComentario,
  editarComentario,
  eliminarComentario
} = require('../controllers/comentario');

router.get('/publicaciones/:id', mostrarComentariosDePublicacion);
router.post('/publicaciones', crearComentario);
router.put('/:id', editarComentario);
router.delete('/:id', eliminarComentario);

module.exports = router;


