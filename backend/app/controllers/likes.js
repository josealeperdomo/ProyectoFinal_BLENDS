const Like = require('../models/like');
const Publicacion = require('../models/publicacion');

const LikesController = {
  darLike: async (req, res) => {
    try {
      // Verificar si el usuario ya ha dado like a esta publicación
      const existeLike = await Like.findOne({ id_usuario: req.body.id_usuario, id_publicacion: req.params.id });
      if (existeLike) {
        return res.status(400).json({ message: 'El usuario ya ha dado like a esta publicación' });
      }

      const nuevoLike = new Like({
        id_usuario: req.body.id_usuario,
        id_publicacion: req.params.id,
      });
      const likeGuardado = await nuevoLike.save();

      await Publicacion.findByIdAndUpdate(req.params.id, { $inc: { cantidad_likes: 1 } });

      res.status(201).json(likeGuardado);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  quitarLike: async (req, res) => {
    try {
      const like = await Like.findOneAndDelete({ id_usuario: req.params.id_usuario, id_publicacion: req.params.id });
      if (!like) {
        return res.status(404).json({ message: 'No se encontró el like para eliminar' });
      }

      // Decrementar el contador de likes después de quitar el like
      await Publicacion.findByIdAndUpdate(req.params.id, { $inc: { cantidad_likes: -1 } });

      res.json({ message: 'Like eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  verificarLike: async (req, res) => {
    try {
      // Buscar un like específico en base al ID del usuario y al ID de la publicación
      const like = await Like.findOne({ id_usuario: req.params.id_usuario, id_publicacion: req.params.id_publicacion });
      if (like) {
        // Si se encuentra el like, enviar una respuesta indicando que el usuario dio like a esta publicación
        res.json({ liked: true });
      } else {
        // Si no se encuentra el like, enviar una respuesta indicando que el usuario no dio like a esta publicación
        res.json({ liked: false });
      }
    } catch (error) {
      // Manejar cualquier error que ocurra durante la búsqueda del like
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = LikesController;
