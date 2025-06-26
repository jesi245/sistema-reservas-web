const express = require('express')
const router = express.Router()
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authRole');


router.get('/panel', authenticateToken, authorizeRole('huesped'), (req, res) => {
  res.json({ message: `Reservas del huésped ${req.user.nombreUsuario}` });
});

module.exports = router