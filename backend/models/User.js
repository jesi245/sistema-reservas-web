const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema ({
    nombreHotel: {type: String, required: true},
    nombreUsuario: {type: String, required: true},
    password: {type: String, required: true},
    role: {
        type: String,
        enum: ["admin", "huesped"],
        required: true
    }
})

module.exports = mongoose.model('User', UserSchema)