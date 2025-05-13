const Hotel = require('../models/Hotel');

// 🔍 Buscar hoteles (para el módulo de filtro)
const buscarHoteles = async (req, res) => {
  try {
    const { ciudad, tipo, fechaEntrada, fechaSalida } = req.body;

    const hoteles = await Hotel.find({
      ciudad: { $regex: ciudad, $options: 'i' },
      tipo: tipo
    });

    console.log("Filtros recibidos", req.body);

    // 🔄 Simulación de filtro por disponibilidad (por ahora sin lógica real)
    const disponibles = hoteles.filter(hotel => true);

    res.json(disponibles);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar hoteles', error });
  }
};

// 🆕 Crear hotel (módulo administrador)
const crearHotel = async (req, res) => {
  try {
    const nuevoHotel = new Hotel(req.body);
    const hotelGuardado = await nuevoHotel.save();
    res.status(201).json(hotelGuardado);
  } catch (error) {
    console.error('Error al crear hotel:', error);
    res.status(500).json({ message: 'Error al crear hotel' });
  }
};

module.exports = {
  buscarHoteles,
  crearHotel
};
