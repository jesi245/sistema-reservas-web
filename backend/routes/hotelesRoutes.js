const express = require('express');
const router = express.Router();
const {
  buscarHoteles,
  crearHotel,
  obtenerHotelPorId
} = require('../controllers/hotelController');

// Ruta para búsqueda de hoteles (huésped)
router.post('/buscar', buscarHoteles);

// Ruta para registrar un nuevo hotel (administrador)
router.post('/admin', crearHotel);

// Ruta para obtener un hotel por ID
router.get('/:id', obtenerHotelPorId);

module.exports = router;
