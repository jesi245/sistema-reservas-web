const Reserva = require('../models/Reserva');
const Hotel = require('../models/Hotel')
const { enviarConfirmacionReserva } = require('../utils/emailService');

exports.crearReserva = async (req, res) => {
  try {
    const { hotelId, fechaEntrada, fechaSalida, nombre, email } = req.body;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ mensaje: 'Hotel no encontrado' });
    }

    const nuevaReserva = new Reserva({
      hotelId,
      nombre,
      email,
      fechaEntrada,
      fechaSalida
    });

    await nuevaReserva.save();

    // 🔔 Enviar mail de confirmación
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
    console.error('Error al realizar la reserva:', error);
    res.status(500).json({ mensaje: 'Error al realizar la reserva' });
  }
};

exports.obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find().populate('hotelId', 'nombre');
    res.json(reservas);
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    res.status(500).json({ message: 'Error al obtener reservas' });
  }
};
