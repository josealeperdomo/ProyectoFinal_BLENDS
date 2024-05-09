const express = require('express');
const router = express.Router()
const {getUsers, createUser, cambiarImagen} = require('../controllers/users')

router.get('/', getUsers)
router.post('/', createUser)
router.patch('/:id/image', cambiarImagen)

module.exports = router