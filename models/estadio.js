const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const EstadioSchema = Schema({
    nombre: String,
    latitud: Number,
    longitud: Number,
    espectadores: Number,
});

module.exports = mongoose.model('Estadio', EstadioSchema);