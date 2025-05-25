const Reserva = require('../models/Reserva');

exports.crearReserva = async (req, res) => {
  try {
    const { nombre, email, fechaEntrada, fechaSalida, hotelId } = req.body;

    const nuevaReserva = new Reserva({
      nombre,
      email,
      fechaEntrada,
      fechaSalida,
      hotelId
    });

    await nuevaReserva.save();
    res.status(201).json({ message: 'Reserva creada con éxito', reserva: nuevaReserva });
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    res.status(500).json({ message: 'Error al crear la reserva' });
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
