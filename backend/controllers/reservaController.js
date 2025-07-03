const Reserva = require('../models/Reserva');
const Hotel = require('../models/Hotel');
const HotelInfo = require('../models/HotelInfo');

const {
  enviarConfirmacionReserva,
  enviarConfirmacionCancelacion,
  enviarMailCheckIn
} = require('../utils/emailService');

// 🟢 Crear una nueva reserva
exports.crearReserva = async (req, res) => {
  try {
    const { hotelId, fechaEntrada, fechaSalida, nombre, email } = req.body;

    // Buscar el hotel por ID
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ mensaje: 'Hotel no encontrado' });
    }

    // Buscar el HotelInfo que coincida por nombre del hotel
    const hotelInfo = await HotelInfo.findOne({ nombreHotel: hotel.nombre });
    if (!hotelInfo) {
      return res.status(404).json({ mensaje: 'No se encontró información del hotel para asociar la reserva' });
    }

    const nuevaReserva = new Reserva({
      hotelId,
      hotelInfoId: hotelInfo._id,
      nombre,
      email,
      fechaEntrada,
      fechaSalida
    });

    await nuevaReserva.save();

    // Enviar mail al huésped
    const resultadoMail = await enviarConfirmacionReserva({
      to: email,
      nombre,
      hotel: hotel.nombre,
      fechaEntrada,
      fechaSalida
    });

    if (!resultadoMail.success) {
      console.warn('Reserva guardada pero no se pudo enviar el mail.');
    }

    res.status(201).json({ mensaje: 'Reserva realizada con éxito', reserva: nuevaReserva });
  } catch (error) {
    console.error('❌ Error al realizar la reserva:', error);
    res.status(500).json({ mensaje: 'Error al realizar la reserva' });
  }
};

// 🔍 Obtener TODAS las reservas (admin general)
exports.obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find().populate('hotelId', 'nombre');
    res.json(reservas);
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    res.status(500).json({ message: 'Error al obtener reservas' });
  }
};

// 🔍 Obtener reservas por huésped
exports.obtenerReservasPorHuesped = async (req, res) => {
  const { email } = req.params;

  try {
    const reservas = await Reserva.find({ email }).populate('hotelId');
    res.json(reservas);
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    res.status(500).json({ message: 'Error al obtener reservas' });
  }
};

// ❌ Cancelar una reserva
exports.eliminarReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id).populate('hotelId');
    if (!reserva) {
      return res.status(404).json({ mensaje: 'Reserva no encontrada' });
    }

    await Reserva.findByIdAndDelete(req.params.id);

    await enviarConfirmacionCancelacion({
      to: reserva.email,
      nombre: reserva.nombre,
      hotel: reserva.hotelId?.nombre || 'Hotel desconocido',
      fechaEntrada: reserva.fechaEntrada,
      fechaSalida: reserva.fechaSalida,
    });

    res.json({ mensaje: 'Reserva cancelada y email enviado' });
  } catch (error) {
    console.error('Error al cancelar reserva:', error);
    res.status(500).json({ mensaje: 'Error al cancelar la reserva' });
  }
};

// ✅ Realizar Check-In
exports.realizarCheckIn = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id).populate('hotelId');

    if (!reserva) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    if (reserva.checkInRealizado) {
      return res.status(400).json({ message: 'El check-in ya fue realizado' });
    }

    reserva.checkInRealizado = true;
    await reserva.save();
    
    await enviarMailCheckIn({
      to: reserva.email,
      nombre: reserva.nombre,
      hotel: reserva.hotelId?.nombre,
      fechaEntrada: reserva.fechaEntrada
    });

    res.json({ message: 'Check-in realizado con éxito' });
  } catch (error) {
    console.error('Error al realizar check-in:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};