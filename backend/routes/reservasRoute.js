const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

// Crear una reserva
router.post('/', reservaController.crearReserva);

// Obtener todas las reservas (opcional)
router.get('/', reservaController.obtenerReservas);

module.exports = router;
