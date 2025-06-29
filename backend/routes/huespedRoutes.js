const express = require('express')
const router = express.Router()
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authRole');
const { actualizarHuesped } = require('../controllers/huespedController');


router.get('/panel', authenticateToken, authorizeRole('huesped'), (req, res) => {
  res.json({ message: `Reservas del huésped ${req.user.nombreUsuario}` });
});

router.put('/panel/:id', actualizarHuesped);

module.exports = router