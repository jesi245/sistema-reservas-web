//const express = require('express');
//const router = express.Router();
//const authenticateToken = require('../middlewares/authMiddleware');
//const authorizeRole = require('../middlewares/authRole');

// Ruta solo para admins
//router.get('/panel', authenticateToken, authorizeRole('admin'), (req, res) => {
  //res.json({ message: 'Bienvenido al panel de administrador' });
  
//});



//module.exports = router;

const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');
const HotelInfo = require('../models/HotelInfo');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/habitaciones', authenticateToken, async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const hotelInfo = await HotelInfo.findOne({ usuarioId });

    if (!hotelInfo) {
      return res.status(404).json({ message: 'No se encontró hotel para este admin' });
    }

    const habitaciones = await Hotel.find({ nombre: hotelInfo.nombreHotel });
    res.json(habitaciones);
  } catch (error) {
    console.error('Error al traer habitaciones del admin:', error);
    res.status(500).json({ message: 'Error al traer habitaciones' });
  }
});

module.exports = router;