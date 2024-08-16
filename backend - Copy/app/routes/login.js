const express = require('express');
const router = express.Router();
const { login, verificarToken } = require('../controllers/login');
const { verifyToken } = require('../middleware/verificacionToken');

router.post('/', login);

router.get('/verifyToken', verificarToken)

module.exports = router;
