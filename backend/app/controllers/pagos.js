const Pago = require('../models/pago');

const PagosController = {
  // Función para insertar un nuevo pago
  insertarPago: async (req, res) => {
    try {
      const nuevoPago = new Pago({
        usuario: req.body.usuario,
        monto: req.body.monto,
        metodo_pago: req.body.metodo_pago
      });
      const pagoGuardado = await nuevoPago.save();

      res.status(201).json(pagoGuardado);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Función para aceptar un pago (actualizar su estado a 'completado')
  aceptarPago: async (req, res) => {
    try {
      const pagoAceptado = await Pago.findByIdAndUpdate(req.params.id, { estado_pago: 'completado' }, { new: true });
      if (!pagoAceptado) {
        return res.status(404).json({ message: 'No se encontró el pago para aceptar' });
      }

      res.json(pagoAceptado);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Función para rechazar un pago (eliminarlo)
  rechazarPago: async (req, res) => {
    try {
      const pagoEliminado = await Pago.findByIdAndDelete(req.params.id);
      if (!pagoEliminado) {
        return res.status(404).json({ message: 'No se encontró el pago para eliminar' });
      }

      res.json({ message: 'Pago eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = PagosController;

