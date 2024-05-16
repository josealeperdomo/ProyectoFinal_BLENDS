const express = require('express');
const router = express.Router();
const {
  verPagos,
  insertarPago,
  aceptarPago,
  rechazarPago
} = require('../controllers/pagos');

// Rutas para insertar, aceptar y rechazar pagos
router.get('/', verPagos);
router.post('/pagos', insertarPago);
router.patch('/pagos/:id/aceptar', aceptarPago);
router.delete('/pagos/:id/rechazar', rechazarPago);

module.exports = router;
