const express = require('express');
const router = express.Router();
const {
  insertarPago,
  aceptarPago,
  rechazarPago
} = require('../controllers/pagos');

// Rutas para insertar, aceptar y rechazar pagos
router.post('/pagos', insertarPago);
router.put('/pagos/:id/aceptar', aceptarPago);
router.delete('/pagos/:id/rechazar', rechazarPago);

module.exports = router;
