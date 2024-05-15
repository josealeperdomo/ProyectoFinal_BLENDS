const express = require('express');
const router = express.Router();
const {
  darLike,
  quitarLike
} = require('../controllers/likes');

// Rutas para dar y quitar likes
router.post('/publicaciones/:id/like', darLike);
router.delete('/publicaciones/:id/unlike', quitarLike);

module.exports = router;
