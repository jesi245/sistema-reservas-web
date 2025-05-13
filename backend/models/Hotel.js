const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ciudad: { type: String, required: true },
  tipo: { type: String, required: true }, // hotel, hostel, cabaña, etc.
  descripcion: { type: String },
  precioPorNoche: { type: Number, required: true },
  servicios: [{ type: String }], // ej: wifi, desayuno, pileta
  fotos: [{ type: String }], // URLs o rutas a imágenes
  disponibilidad: [
    {
      desde: Date,
      hasta: Date
    }
  ],
  habitaciones: [
    {
      numero: Number,
      disponibles: [
        {
          desde: Date,
          hasta: Date
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Hotel', hotelSchema);
