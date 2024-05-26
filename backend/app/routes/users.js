const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUser,
    cambiarImagen,
    createUser,
    updateUser,
    deleteUser,
    getAmigos
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUser);
router.get('/amigos/:id', getAmigos)
router.post('/', createUser);
router.put('/:id', updateUser);
router.put('/cambiarimagen/:id', cambiarImagen);
router.delete('/:id', deleteUser);

module.exports = router;
