const Comentario = require('../models/comentario');

const crearComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const { texto } = req.body;

        const comentario = new Comentario({
            publicacionId: id,
            texto,
            usuarioId: req.user._id 
        });

        await comentario.save();

        res.status(201).json({ message: 'Comentario creado con éxito', comentario });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear comentario', error: error.message });
    }
};

const editarComentario = async (req, res) => {
    try {
        const { id, comentarioId } = req.params;
        const { texto } = req.body;

        const comentario = await Comentario.findOneAndUpdate(
            { _id: comentarioId, publicacionId: id },
            { texto },
            { new: true }
        );

        if (!comentario) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }

        res.status(200).json({ message: 'Comentario editado con éxito', comentario });
    } catch (error) {
        res.status(500).json({ message: 'Error al editar comentario', error: error.message });
    }
};

const eliminarComentario = async (req, res) => {
    try {
        const { id, comentarioId } = req.params;

        const comentario = await Comentario.findOneAndDelete({ _id: comentarioId, publicacionId: id });

        if (!comentario) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }

        res.status(200).json({ message: 'Comentario eliminado con éxito', comentario });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar comentario', error: error.message });
    }
};

module.exports = { crearComentario, editarComentario, eliminarComentario };
