const express = require('express');
const router = express.Router();
const { obtenerReservasPorAdmin } = require('../controllers/reservasAdminController');
const { obtenerCheckInsPorAdmin } = require('../controllers/reservasAdminController');
const authenticateToken = require('../middlewares/authMiddleware');

// Ruta protegida para obtener reservas asociadas al hotel del admin logueado
router.get('/', authenticateToken, obtenerReservasPorAdmin);
router.get('/checkins', authenticateToken, obtenerCheckInsPorAdmin);

module.exports = router;