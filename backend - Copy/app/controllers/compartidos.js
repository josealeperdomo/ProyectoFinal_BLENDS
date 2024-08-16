const Compartido = require('../models/compartido');

const CompartidoController = {
  compartirPublicacion: async (req, res) => {
    try {
      const nuevoCompartido = new Compartido({
        id_publicacion: req.body.id_publicacion,
        id_usuario: req.body.id_usuario,
      });
      const compartidoGuardado = await nuevoCompartido.save();

      res.status(201).json(compartidoGuardado);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  eliminarCompartido: async (req, res) => {
    try {
      // Buscar y eliminar el compartido por su ID generado
      const compartidoEliminado = await Compartido.findByIdAndDelete(req.params.id);
      if (!compartidoEliminado) {
        return res.status(404).json({ message: 'No se encontró el compartido para eliminar' });
      }

      res.json({ message: 'Compartido eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  obtenerCompartidos: async (req, res) => {
    try {
      const compartidos = await Compartido.find();
      res.json(compartidos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = CompartidoController;



