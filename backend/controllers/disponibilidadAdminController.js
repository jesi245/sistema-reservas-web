const Reserva = require('../models/Reserva');
const Hotel = require('../models/Hotel');
const HotelInfo = require('../models/HotelInfo');

exports.obtenerHabitacionesDisponibles = async (req, res) => {
  try {
    const usuarioId = req.user.id;

    const hotelInfo = await HotelInfo.findOne({ usuarioId });
    if (!hotelInfo) {
      return res.status(404).json({ message: 'No se encontró un hotel asociado al administrador.' });
    }

    const habitaciones = await Hotel.find({ ciudad: hotelInfo.ciudad });

    const reservasOcupadas = await Reserva.find({ checkInRealizado: true });
    const habitacionesOcupadasIds = reservasOcupadas.map(r => r.hotelId.toString());

    const disponibles = habitaciones.filter(h => !habitacionesOcupadasIds.includes(h._id.toString()));

    res.status(200).json(disponibles);
  } catch (error) {
    console.error('❌ Error al obtener habitaciones disponibles:', error);
    res.status(500).json({ message: 'Error al obtener habitaciones disponibles' });
  }
};