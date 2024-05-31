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
    cambiarContrasena,
    mostrarUsuariosRandoms,
    obtenerUsuarioPorUser,
    verificarCorreo
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUser);
router.get('/user/:user', obtenerUsuarioPorUser)
router.get('/amigos/:id', getAmigos)
router.post('/', createUser);
router.put('/:id', updateUser);
router.put('/cambiarimagen/:id', cambiarImagen);
router.delete('/:id', deleteUser);
router.put('/:id/contrasena', cambiarContrasena);
router.get('/users/sugeridos', mostrarUsuariosRandoms)
router.post('/verificarCorreo', verificarCorreo);

module.exports = router;
