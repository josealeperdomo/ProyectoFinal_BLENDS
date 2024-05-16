const EstadoEnLinea = require('../models/estadoOnline');

const OnlineStatusController = {
  activarEstadoEnLinea: async (idUsuario) => {
    try {
      const estadoExistente = await EstadoEnLinea.findOne({ id_usuario: idUsuario });


      if (!estadoExistente) {
        await EstadoEnLinea.create({ id_usuario: idUsuario, estado: true });
      } else {

        estadoExistente.estado = true;
        estadoExistente.ultima_actualizacion = Date.now();
        await estadoExistente.save();
      }

      return { success: true, message: 'Estado en línea activado correctamente' };
    } catch (error) {
      console.error('Error al activar el estado en línea:', error);
      return { success: false, message: 'Error al activar el estado en línea' };
    }
  },

  desactivarEstadoEnLinea: async (idUsuario) => {
    try {
    
      const estadoEnLinea = await EstadoEnLinea.findOne({ id_usuario: idUsuario });
  

      if (estadoEnLinea && estadoEnLinea.estado) {
        estadoEnLinea.estado = false;
        estadoEnLinea.ultima_actualizacion = Date.now();
        await estadoEnLinea.save();
        return { success: true, message: 'Estado en línea desactivado correctamente' };
      } else {

        return { success: false, message: 'El usuario ya estaba fuera de línea' };
      }
    } catch (error) {
      console.error('Error al desactivar el estado en línea:', error);
      return { success: false, message: 'Error al desactivar el estado en línea' };
    }
  }
}  

module.exports = OnlineStatusController;
