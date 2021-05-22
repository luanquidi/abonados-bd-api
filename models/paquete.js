const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const PaqueteSchema = Schema({
    nombre_paquete: String,
    precio: String,
    descripcion_paquete: String,
    fk_partidos: [{
        type: Schema.Types.ObjectId,
        ref: 'Partido'
    }],
});

module.exports = mongoose.model('Paquete', PaqueteSchema);