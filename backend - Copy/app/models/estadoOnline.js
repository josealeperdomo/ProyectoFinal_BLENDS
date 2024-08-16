const mongoose = require('mongoose');

const EstadoEnLineaSchema = new mongoose.Schema({
    id_usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    estado: {
        type: Boolean,
        required: true
    },
    ultima_actualizacion: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('EstadoEnLinea', EstadoEnLineaSchema);
