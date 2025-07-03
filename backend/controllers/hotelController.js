const Hotel = require('../models/Hotel');
const HotelInfo = require('../models/HotelInfo');

// 🔍 Buscar hoteles (para el módulo de filtro)
const buscarHoteles = async (req, res) => {
  try {
    const { ciudad, tipo, fechaEntrada, fechaSalida } = req.body;

    const hoteles = await Hotel.find({
      ciudad: { $regex: ciudad, $options: 'i' },
      tipo: tipo
    });

    console.log(hoteles);
    console.log("Filtros recibidos", req.body);

    const disponibles = hoteles.filter(hotel => true); // Simulación
    res.json(disponibles);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar hoteles', error });
  }
};

// 🆕 Crear habitación (módulo administrador)
const crearHotel = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    if (!req.user || !req.user.id) {
  return res.status(401).json({ mensaje: 'Token inválido o no enviado' });
}

    // Buscar el HotelInfo del admin
    const hotelInfo = await HotelInfo.findOne({ usuarioId });
    if (!hotelInfo) {
      return res.status(404).json({ message: 'No se encontró información del hotel para este administrador.' });
    }

    const nuevoHotel = new Hotel({
      ...req.body,
      hotelInfoId: hotelInfo._id
    });

    const hotelGuardado = await nuevoHotel.save();
    res.status(201).json(hotelGuardado);
  } catch (error) {
    console.error('Error al crear habitación:', error);
    res.status(500).json({ message: 'Error al crear la habitación' });
  }
};

// 🔎 Obtener un hotel por ID
const obtenerHotelPorId = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ mensaje: 'Hotel no encontrado' });
    }
    res.json(hotel);
  } catch (error) {
    console.error('Error al obtener hotel por ID:', error);
    res.status(500).json({ mensaje: 'Error al obtener el hotel' });
  }
};

const obtenerHotelesRecomendados = async (req, res) => {
  try {
    const hoteles = await Hotel.aggregate([{ $sample: { size: 3 } }]);
    res.json(hoteles);
  } catch (error) {
    console.error('Error al obtener recomendaciones:', error);
    res.status(500).json({ message: 'Error al obtener recomendaciones' });
  }
};
module.exports = {
  buscarHoteles,
  crearHotel,
  obtenerHotelPorId,
  obtenerHotelesRecomendados
};
