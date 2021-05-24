const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const AbonadoSchema = Schema({
    fk_usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    fk_paquete: {
        type: Schema.Types.ObjectId,
        ref: 'Paquete'
    },
});

module.exports = mongoose.model('Abonado', AbonadoSchema);