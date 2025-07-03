const express = require('express');
const router = express.Router();
const { obtenerHabitacionesDisponibles } = require('../controllers/disponibilidadAdminController');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, obtenerHabitacionesDisponibles);

module.exports = router;