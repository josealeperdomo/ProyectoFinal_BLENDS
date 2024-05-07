const mongoose = require('mongoose');

const ComentarioSchema = new mongoose.Schema({
    id_Publicacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publicacion',
        required: true
    },
    usuario_comentario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    texto: {
        type: String,
        required: true
    },
    enlace: {
        type: String
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

module.exports = mongoose.model('Comentario', ComentarioSchema);
