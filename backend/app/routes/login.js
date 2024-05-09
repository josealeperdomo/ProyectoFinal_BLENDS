const express = require('express');
const router = express.Router();
const { login } = require('../controllers/login');
const { verifyToken } = require('../middleware/verificacionToken');

// Ruta para iniciar sesión
router.post('/', login);

// Ejemplo de ruta protegida
router.get('/perfil', verifyToken, (req, res) => {
    // La ruta '/perfil' está protegida por el middleware verifyToken
    // req.user contendrá los detalles del usuario decodificado del token
    res.json({ message: 'Bienvenido a tu perfil', user: req.user });
});

module.exports = router;
