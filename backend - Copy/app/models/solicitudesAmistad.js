const mongoose = require('mongoose');

const SolicitudSchema = new mongoose.Schema({
    usuarioEmisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    usuarioReceptor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Solicitud', SolicitudSchema);
