const Reserva = require('../models/Reserva');
const HotelInfo = require('../models/HotelInfo');

exports.obtenerReservasPorAdmin = async (req, res) => {
  try {
    const usuarioId = req.user.id;

    // 1. Buscar el hotel administrado por este usuario
    const hotelInfo = await HotelInfo.findOne({ usuarioId });

    if (!hotelInfo) {
      return res.status(404).json({ message: 'No se encontró información del hotel para este administrador' });
    }

    // 2. Buscar reservas que estén asociadas a este hotel (hotelInfoId)
    const reservas = await Reserva.find({ hotelInfoId: hotelInfo._id });

    res.status(200).json(reservas);
  } catch (error) {
    console.error('❌ Error al obtener reservas del admin:', error);
    res.status(500).json({ message: 'Error al obtener reservas' });
  }
};

exports.obtenerCheckInsPorAdmin = async (req, res) => {
  try {
    const usuarioId = req.user.id;

    const hotel = await HotelInfo.findOne({ usuarioId });
    if (!hotel) {
      return res.status(404).json({ message: 'No se encontró un hotel para este administrador' });
    }

    const checkIns = await Reserva.find({
      hotelInfoId: hotel._id,
      checkInRealizado: true
    });

    res.status(200).json(checkIns);
  } catch (error) {
    console.error('❌ Error al obtener check-ins:', error);
    res.status(500).json({ message: 'Error al obtener check-ins' });
  }
};