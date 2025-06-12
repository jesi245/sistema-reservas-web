const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authRole');

// Ruta solo para admins
router.get('/panel', authenticateToken, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Bienvenido al panel de administrador' });
  
});

// Ruta solo para huéspedes
/*router.get('/huesped/reservas', authenticateToken, authorizeRole('huesped'), (req, res) => {
  res.json({ message: `Reservas del huésped ${req.user.nombreUsuario}` });
});*/

module.exports = router;