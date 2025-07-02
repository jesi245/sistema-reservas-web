const express = require('express');
const router = express.Router();
const {
  crearHotelInfo,
  obtenerHotelInfo,
  actualizarHotelInfo
} = require('../controllers/hotelInfoController');
const authenticateToken = require('../middlewares/authMiddleware');

// ✅ Crear info del hotel
router.post('/crear', authenticateToken, crearHotelInfo);

// ✅ Obtener info del hotel por usuario logueado
router.get('/', authenticateToken, obtenerHotelInfo);

// ✅ Actualizar info del hotel por ID
router.put('/actualizar/:id', authenticateToken, actualizarHotelInfo);

module.exports = router;

