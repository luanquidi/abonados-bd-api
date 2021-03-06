const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const PartidoSchema = Schema({
    fecha_partido: Date,
    hora: String,
    equipo_local: String,
    equipo_visita: String,
    fk_estadio: {
        type: Schema.Types.ObjectId,
        ref: 'Estadio'
    }
});

module.exports = mongoose.model('Partido', PartidoSchema);