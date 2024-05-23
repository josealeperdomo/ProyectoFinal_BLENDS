const mongoose = require('mongoose');

const PublicacionSchema = new mongoose.Schema({
    usuario_publicacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    texto: {
        type: String,
        maxLength: 280,
        required: true

    },
    imagen_publicacion: {
        type: String,
        default: null
    },
    enlace: String,
}, {
    timestamps: true,
    versionKey: false
});

PublicacionSchema.methods.setImg = function(imagen_publicacion) {
    const host = process.env.HOST
    const port = process.env.PORT
    this.imagen_publicacion = `${host}:${port}/public/${imagen_publicacion}`
}

module.exports = mongoose.model('Publicacion', PublicacionSchema);
