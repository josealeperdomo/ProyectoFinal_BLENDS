const express = require('express');
const router = express.Router();
const {
  enviarMensaje,
  verMensajes
} = require('../controllers/mensajes');

// Rutas para dar y quitar likes
router.get('/:id/:senderId', verMensajes);
router.post('/enviar/:id', enviarMensaje);

module.exports = router;
