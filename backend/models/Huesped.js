const mongoose = require('mongoose')

const HuespedSchema = new mongoose.Schema({
    nombreHuesped: { type: String, required: true},
    apellidoHuesped: {type: String, required: true},
    email: {type: String, required: true, unique: true, match: /.+\@.+\..+/},
    tel: {type: String, required: true, match: /^[0-9+\-\s()]{6,20}$/ },
    fechaNacimiento: {type: Date, required: true},
    nacionalidad: {type: String, required: true},
    genero: {
        type: String,
        enum: ['Masculino', 'Femenino', 'Otro'],
        required: true
    },
    direccion: {
        pais: {type: String, required: true},
        calle: {type: String, required: true},
        ciudad: {type: String, required: true},
        codigoPostal: {type: String, required: true}
    },
    nroPasaporte: { type: String, required: true, unique: true},
    role: {type: String, required: true}
}, { timestamps: true})

module.exports = mongoose.model('Huesped', HuespedSchema)