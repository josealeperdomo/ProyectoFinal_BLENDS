const Like = require('../models/like');
const Publicacion = require('../models/publicacion');

const LikesController = {
  darLike: async (req, res) => {
    try {
      const { id_usuario } = req.body;
      const { id } = req.params;

      const existeLike = await Like.findOne({ id_usuario, id_publicacion: id });
      if (existeLike) {
        return res.status(400).json({ message: 'El usuario ya ha dado like a esta publicación' });
      }

      const nuevoLike = new Like({ id_usuario, id_publicacion: id });
      await nuevoLike.save();

      const publicacionActualizada = await Publicacion.findByIdAndUpdate(id, { $inc: { cantidad_likes: 1 } }, { new: true });

      res.status(201).json(publicacionActualizada);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  quitarLike: async (req, res) => {
    try {
      const { id_usuario } = req.params;
      const { id } = req.params;

      const like = await Like.findOneAndDelete({ id_usuario, id_publicacion: id });
      if (!like) {
        return res.status(404).json({ message: 'No se encontró el like para eliminar' });
      }

      const publicacionActualizada = await Publicacion.findByIdAndUpdate(id, { $inc: { cantidad_likes: -1 } }, { new: true });

      res.json(publicacionActualizada);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  verificarLike: async (req, res) => {
    try {
      const { id_usuario, id_publicacion } = req.params;

      const like = await Like.findOne({ id_usuario, id_publicacion });
      res.json({ liked: !!like });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = LikesController;
