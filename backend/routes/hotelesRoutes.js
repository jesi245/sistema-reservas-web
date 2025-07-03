const express = require('express');
const router = express.Router();

const {
  buscarHoteles,
  crearHotel,
  obtenerHotelPorId,
  obtenerHotelesRecomendados
} = require('../controllers/hotelController');

const authenticateToken = require('../middlewares/authMiddleware'); // ✅ importar correctamente

// Ruta para hoteles recomendados
router.get('/recomendaciones', obtenerHotelesRecomendados);

// Ruta para búsqueda de hoteles (huésped)
router.post('/buscar', buscarHoteles);

// Ruta para registrar un nuevo hotel (administrador) — protegida
router.post('/admin', authenticateToken, crearHotel);

// Ruta para obtener un hotel por ID
router.get('/:id', obtenerHotelPorId);



module.exports = router;

