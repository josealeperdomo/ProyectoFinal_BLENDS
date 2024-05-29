const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUser,
    cambiarImagen,
    createUser,
    updateUser,
    deleteUser,
    getAmigos,
    cambiarContrasena
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUser);
router.get('/amigos/:id', getAmigos)
router.post('/', createUser);
router.put('/:id', updateUser);
router.put('/cambiarimagen/:id', cambiarImagen);
router.delete('/:id', deleteUser);
router.put('/:id/contrasena', cambiarContrasena);

module.exports = router;
