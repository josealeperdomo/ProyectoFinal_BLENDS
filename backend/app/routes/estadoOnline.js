const express = require('express');
const router = express.Router();
const OnlineStatusController = require('../controllers/estadoOnline');

router.post('/online', async (req, res) => {
  const { userId } = req.body; 
  const result = await OnlineStatusController.activarEstadoEnLinea(userId);
  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(500).json({ message: result.message });
  }
});

// Ruta para desactivar el estado en línea
router.post('/offline', async (req, res) => {
  const { userId } = req.body; 
  const result = await OnlineStatusController.desactivarEstadoEnLinea(userId);
  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(500).json({ message: result.message });
  }
});

module.exports = router;
