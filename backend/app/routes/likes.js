const express = require('express');
const router = express.Router();
const { darLike, quitarLike, verificarLike } = require('../controllers/likes');

// Rutas para dar, quitar y verificar likes
router.post('/publicaciones/:id/like', darLike);
router.delete('/publicaciones/:id/unlike/:id_usuario', quitarLike);
router.get('/publicaciones/:id_publicacion/usuario/:id_usuario/like', verificarLike);

module.exports = router;
