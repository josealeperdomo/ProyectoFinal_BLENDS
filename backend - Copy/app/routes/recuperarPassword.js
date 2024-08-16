const express = require('express');
const router = express.Router();
const {
verificarCorreo,
verificarCodigo,
cambiarPassword
} = require('../controllers/recuperarPassword');

router.post('/verificarCorreo', verificarCorreo);
router.post('/verificarCodigo', verificarCodigo);
router.patch('/nuevaContrasena/:id', cambiarPassword)


module.exports = router;
