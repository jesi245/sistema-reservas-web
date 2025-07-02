const mongoose = require('mongoose');

const HotelInfoSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  nombreHotel: { type: String, required: true },
  descripcion: { type: String },
  ciudad: { type: String },
  provincia: { type: String },
  servicios: [{ type: String }],
  cantidadHabitaciones: { type: Number },
  emailContacto: { type: String },
  logoUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('HotelInfo', HotelInfoSchema);
