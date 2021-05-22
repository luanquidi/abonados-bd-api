const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const UserSchema = Schema({
    nombre: String,
    apellidos: String,
    correo: {
        type: String,
        unique: true
    },
    password: String,
    role: String,
    active: Boolean,
    avatar: String,
    tipo_documento: String,
    numero_documento: String,
    direccion: String,
    ciudad: String,
});

module.exports = mongoose.model('User', UserSchema);