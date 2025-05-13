const express = require('express');
const router = express.Router();
const {
  buscarHoteles,
  crearHotel
} = require('../controllers/hoteles.controller');

// Ruta para búsqueda de hoteles (huésped)
router.post('/buscar', buscarHoteles);

// Ruta para registrar un nuevo hotel (administrador)
router.post('/admin', crearHotel);

module.exports = router;
