const Solicitud = require('../models/solicitudesAmistad');
const User = require('../models/users');

const SolicitudControllers = {
    mostrarsolicitudes: async (req, res) => {
        try {
            const solicitudes = await Solicitud.find({ usuarioReceptor: req.params.id }).populate('usuarioEmisor', 'usuario imagen_perfil')
            res.status(200).json(solicitudes);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener solicitud' });
        }
    },
    mostrarAmigos: async(req,res)=>{
        try {
            const usuario = await User.findById(req.params.id)
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            const promesasAmigos = usuario.amigos.map(async amigoId => {
                const amigo = await User.findById(amigoId);
                return amigo;
            });
    
            const amigos = await Promise.all(promesasAmigos);
    
            res.status(200).json({ amigos });
        } catch (error) {
            console.error('Error al obtener amigos:', error);
            res.status(500).json({ message: 'Error al obtener amigos', error: error.message });
        }
    }
    ,
    enviarSolicitud: async (req, res) => {
        try {
            const { id_emisor, id_receptor } = req.body;
            const solicitudExistente = await Solicitud.findOne({ usuarioEmisor: id_emisor, usuarioReceptor: id_receptor });
            if (solicitudExistente) {
                return res.status(400).json({ message: 'El usuario ya ha enviado una solicitud' });
            }
            const usuariosAmigos = await User.findById(id_emisor, 'amigos');
            if (usuariosAmigos && usuariosAmigos.amigos.includes(id_receptor)) {
                return res.status(400).json({ message: 'Estos usuarios ya son amigos' });
            }
            const nuevaSolicitud = await Solicitud.create({
                usuarioEmisor: id_emisor,
                usuarioReceptor: id_receptor
            });
            res.status(200).json({ message: 'Solicitud creada correctamente', solicitud: nuevaSolicitud });
        } catch (error) {
            console.error('Error al crear solicitud:', error);
            res.status(500).json({ message: 'Error al crear solicitud', error: error.message });
        }
    },

    cancelarSolicitud: async(req,res)=>{
        try {
            const { id_emisor, id_receptor } = req.body
            const solicitudExistente = await Solicitud.findOneAndDelete({ usuarioEmisor: id_emisor, usuarioReceptor: id_receptor });
            if(!solicitudExistente){
                return res.status(400).json({ message: 'No existe una solicitud para eliminar' });
            }
            res.status(200).json({"Message":"Solicitud Eliminada", solicitudExistente})
        } catch (error) {
            res.status(400).json({message: 'Error al eliminar solicitud'})
        }
    },

    aceptarSolicitud: async(req,res)=>{
        try {
            const { id_emisor, id_receptor } = req.body
            const solicitudExistente = await Solicitud.findOneAndDelete({ usuarioEmisor: id_emisor, usuarioReceptor: id_receptor });
            if(!solicitudExistente){
                return res.status(400).json({ message: 'No existe una solicitud para eliminar' });
            }
            const usuariosAmigos = await User.findById(id_emisor, 'amigos');
            if (usuariosAmigos && usuariosAmigos.amigos.includes(id_receptor)) {
                return res.status(400).json({ message: 'Estos usuarios ya son amigos' });
            }
            const nuevoAmigo = await User.findByIdAndUpdate(id_emisor,{ $addToSet: { amigos: id_receptor } },{ new: true })
            const nuevoAmigo2 = await User.findByIdAndUpdate(id_receptor,{ $addToSet: { amigos: id_emisor } },{ new: true })
            nuevoAmigo.save()
            nuevoAmigo2.save()
            res.status(200).json({ message: 'Amigos anadidos', nuevoAmigo, nuevoAmigo2 });
        } catch (error) {
            res.status(400).json({message: 'Error al agregar amigo'})
        }
    },

   rechazarSolicitud: async(req,res)=>{
        try {
            const { id_emisor, id_receptor } = req.body
            const solicitudExistente = await Solicitud.findOneAndDelete({ usuarioEmisor: id_emisor, usuarioReceptor: id_receptor });
            if(!solicitudExistente){
                return res.status(400).json({ message: 'No existe una solicitud para rechazar' });
            }
            res.status(200).json({"Message":"Solicitud Rechazada", solicitudExistente})
        } catch (error) {
            res.status(400).json({message: 'Error al Rechazar solicitud'})
        }
    },

    eliminarAmigo: async(req,res)=>{
        try {
            const { id_emisor, id_receptor } = req.body
            const usuarioActualizado = await User.findByIdAndUpdate(id_emisor,{ $pull: { amigos: id_receptor} },{ new: true })
            const usuarioActualizado2 = await User.findByIdAndUpdate(id_receptor,{ $pull: { amigos: id_emisor } },{ new: true })
            if(!usuarioActualizado && !usuarioActualizado2){
                return res.status(400).json({ message: 'No existe esta amistad' });
            }
            res.status(200).json({"Message":"Amistad eliminada", usuarioActualizado, usuarioActualizado2})
        } catch (error) {
            res.status(400).json({message: 'Error al eliminar amigo'})
        }
    }
}

module.exports = SolicitudControllers