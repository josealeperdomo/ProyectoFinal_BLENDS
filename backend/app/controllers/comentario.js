const Comentario = require('../models/comentario');
const User = require('../models/users')

const ComentariosController = {
  // Mostrar todos los comentarios de una publicación
  mostrarComentariosDePublicacion: async (req, res) => {
    try {
      const comentarios = await Comentario.find({ id_Publicacion: req.params.id }).populate('usuario_comentario', 'nombre imagen_perfil');  
      res.json(comentarios);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Crear un nuevo comentario para una publicación
  crearComentario: async (req, res) => {
    try {
      const nuevoComentario = new Comentario({
        id_Publicacion: req.body.id_Publicacion,
        usuario_comentario: req.body.usuario_comentario,
        texto: req.body.texto,
        //enlace: req.body.enlace
      });
      const comentarioGuardado = await nuevoComentario.save();
      res.status(201).json(comentarioGuardado);
    } catch (error) {
      res.status(400).json({ message: 'Error al crear el comentario' });
    }
  },

  // Editar un comentario existente
  editarComentario: async (req, res) => {
    try {
      const comentario = await Comentario.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!comentario) {
        return res.status(404).json({ message: 'Comentario no encontrado' });
      }
      res.json(comentario);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Eliminar un comentario
  eliminarComentario: async (req, res) => {
    try {
      const comentarioEliminado = await Comentario.findByIdAndDelete(req.params.id);
      if (!comentarioEliminado) {
        return res.status(404).json({ message: 'Comentario no encontrado' });
      }
      res.json({ message: 'Comentario eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = ComentariosController;
