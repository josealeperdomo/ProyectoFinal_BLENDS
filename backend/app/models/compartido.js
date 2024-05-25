const mongoose = require('mongoose');

const CompartidoSchema = new mongoose.Schema({
    id_publicacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publicacion',
        required: true
    },
    id_usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: false, 
    versionKey: false
});

module.exports = mongoose.model('Compartido', CompartidoSchema);
