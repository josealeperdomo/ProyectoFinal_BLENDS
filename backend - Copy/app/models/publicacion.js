const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

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
    }
    ,cantidad_likes: {
        type: Number,
        default: 0
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

PublicacionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Publicacion', PublicacionSchema);
