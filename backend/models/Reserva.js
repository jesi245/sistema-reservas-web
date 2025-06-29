const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  fechaEntrada: {
    type: Date,
    required: true
  },
  fechaSalida: {
    type: Date,
    required: true
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  checkInRealizado: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

module.exports = mongoose.model('Reserva', reservaSchema);
