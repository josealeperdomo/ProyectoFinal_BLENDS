const express = require('express');
const router = express.Router();
const {mostrarsolicitudes ,enviarSolicitud, cancelarSolicitud, aceptarSolicitud, rechazarSolicitud, eliminarAmigo, mostrarAmigos} = require('../controllers/solicitudesAmistad');

router.get('/:id',mostrarsolicitudes)
router.get("/amigos/:id", mostrarAmigos)
router.post('/enviarSolicitud', enviarSolicitud)
router.delete('/cancelarSolicitud', cancelarSolicitud)
router.patch('/aceptarSolicitud', aceptarSolicitud)
router.delete('/rechazarSolicitud', rechazarSolicitud)
router.delete('/rechazarSolicitud/:id/:id_emisor', rechazarSolicitud)
router.patch('/eliminarAmigo', eliminarAmigo)

module.exports = router;
