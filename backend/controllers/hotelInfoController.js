const HotelInfo = require('../models/HotelInfo');

// ✅ Controlador para guardar información del hotel
exports.crearHotelInfo = async (req, res) => {
  try {
    const usuarioId = req.user.id;

    // Verificamos si ya existe info para este usuario
    const existente = await HotelInfo.findOne({ usuarioId });
    if (existente) {
      return res.status(400).json({ message: 'La información del hotel ya existe para este usuario.' });
    }

    const nuevaInfo = new HotelInfo({
      usuarioId,
      nombreHotel: req.body.nombreHotel,
      descripcion: req.body.descripcion,
      ciudad: req.body.ciudad,
      provincia: req.body.provincia,
      servicios: req.body.servicios,
      cantidadHabitaciones: req.body.cantidadHabitaciones,
      emailContacto: req.body.emailContacto,
      logoUrl: req.body.logoUrl
    });

    await nuevaInfo.save();
    console.log('✅ Documento guardado en la colección hotelinfos');

    res.status(201).json({ message: 'Información del hotel guardada correctamente', data: nuevaInfo });
  } catch (error) {
    console.error('❌ Error al guardar información del hotel:', error);
    res.status(500).json({ message: 'Error al guardar información del hotel' });
  }
};

// ✅ Controlador para obtener la información del hotel
exports.obtenerHotelInfo = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const info = await HotelInfo.findOne({ usuarioId });
    res.status(200).json(info);
  } catch (error) {
    console.error('❌ Error al obtener información del hotel:', error);
    res.status(500).json({ message: 'Error al obtener la información del hotel' });
  }
};

// ✅ Controlador para actualizar la información del hotel
exports.actualizarHotelInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.user.id;

    // Verificar si el hotel pertenece al usuario
    const hotelExistente = await HotelInfo.findOne({ _id: id, usuarioId });
    if (!hotelExistente) {
      return res.status(404).json({ message: 'No se encontró la información del hotel para este usuario.' });
    }

    // Actualizar campos
    const camposActualizados = {
      nombreHotel: req.body.nombreHotel,
      descripcion: req.body.descripcion,
      ciudad: req.body.ciudad,
      provincia: req.body.provincia,
      servicios: req.body.servicios,
      cantidadHabitaciones: req.body.cantidadHabitaciones,
      emailContacto: req.body.emailContacto,
      logoUrl: req.body.logoUrl
    };

    const hotelActualizado = await HotelInfo.findByIdAndUpdate(
      id,
      camposActualizados,
      { new: true }
    );

    res.status(200).json({
      message: 'Información del hotel actualizada correctamente',
      data: hotelActualizado
    });
  } catch (error) {
    console.error('❌ Error al actualizar información del hotel:', error);
    res.status(500).json({ message: 'Error al actualizar la información del hotel' });
  }
};


