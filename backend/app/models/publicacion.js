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
    imagen: {
        data: Buffer, // Almacenamiento de la imagen como un flujo de bytes, preguntar como se gestionan las immagenes, descargar la libreria "multer"
        contentType: String // Tipo de contenido de la imagen (por ejemplo, image/jpeg)
    },
    enlace: String,
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Publicacion', PublicacionSchema);
