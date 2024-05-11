const Publicacion = require('../models/publicacion');

const PublicacionesController = {
  mostrarPublicaciones: async (req, res) => {
    try {
      const publicaciones = await Publicacion.find().populate('usuario_publicacion').sort({createdAt: -1});
      res.json(publicaciones);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  mostrarPublicacion: async (req, res) => {
    try {
      const publicacion = await Publicacion.findById(req.params.id).populate('usuario_publicacion');
      if (!publicacion) {
        return res.status(404).json({ message: 'Publicación no encontrada' });
      }
      res.json(publicacion);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  crearPublicacion: async (req, res) => {
    try {
      const nuevaPublicacion = new Publicacion({
        usuario_publicacion: req.body.usuario_publicacion,
        texto: req.body.texto,
        imagen: req.body.imagen,
        enlace: req.body.enlace
      });
      const publicacionGuardada = await nuevaPublicacion.save();
      res.status(201).json(publicacionGuardada);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  editarPublicacion: async (req, res) => {
    try {
      const publicacion = await Publicacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!publicacion) {
        return res.status(404).json({ message: 'Publicación no encontrada' });
      }
      res.json(publicacion);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  eliminarPublicacion: async (req, res) => {
    try {
      const publicacionEliminada = await Publicacion.findByIdAndDelete(req.params.id);
      if (!publicacionEliminada) {
        return res.status(404).json({ message: 'Publicación no encontrada' });
      }
      res.json({ message: 'Publicación eliminada exitosamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = PublicacionesController;
