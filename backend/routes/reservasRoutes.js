const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

// Crear una reserva
router.post('/', reservaController.crearReserva);

// Obtener todas las reservas (opcional)
router.get('/', reservaController.obtenerReservas);

// GET /api/reservas/huesped/:email
router.get('/huesped/:email', reservaController.obtenerReservasPorHuesped);

router.delete('/:id', reservaController.eliminarReserva);

router.put('/checkin/:id', reservaController.realizarCheckIn);


module.exports = router;
