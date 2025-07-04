const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema ({
    nombreHotel: {type: String},
    nombreUsuario: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true}
})

module.exports = mongoose.model('User', UserSchema)