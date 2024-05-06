const mongoose = require('mongoose');

const NotificacionSchema = new mongoose.Schema({
    usuarioDestinatario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    usuarioEmisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    publicacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publicacion',
        required: true
    },
    tipo_notificacion: {
        type: String,
        enum: ['like_publicación', 'like_comentario', 'publicación_compartida por_usuario'],
        required: true
    },
    contenido: {
        type: String,
        required: true
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    },
    fecha_modificacion: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Notificacion', NotificacionSchema);
