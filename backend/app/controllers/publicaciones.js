const Publicacion = require('../models/publicacion');
const User = require('../models/users');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'storage/imgs'); 
  },
  filename: (req, file, cb) => {
    const generatedFileName = uuid.v4() + path.extname(file.originalname);
    cb(null, generatedFileName);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('ERROR: El archivo debe ser una imagen válida'));
  }
}).single('imagen_publicacion');

const PublicacionesController = {
  mostrarPublicaciones: async (req, res) => {
    try {
        const publicaciones = await Publicacion.find()
            .populate('usuario_publicacion')
            .sort({ createdAt: -1 });
        res.json(publicaciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},
  mostrarPublicacion: async (req, res) => {
    try {
      const publicacion = await Publicacion.findById(req.params.id).populate('usuario_publicacion');
      if (!publicacion) {
        return res.status(404).json({ message: 'Publicación no encontrada' });
      }
      res.json(publicacion);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  crearPublicacion: async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      try {
        const usuario_publicacion = req.body.usuario_publicacion;
        const texto = req.body.texto;

        // Verifica si el usuario existe
        const usuario = await User.findById(usuario_publicacion);
        if (!usuario) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Crea la nueva publicación
        const nuevaPublicacion = new Publicacion({
          usuario_publicacion,
          texto
        });

        // Establece la imagen si se ha subido una
        if (req.file) {
          nuevaPublicacion.setImg(req.file.filename);
        }

        // Guarda la publicación en la base de datos
        await nuevaPublicacion.save();

        res.status(201).json({ publicacion: nuevaPublicacion });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la publicación' });
      }
    });
  },

  editarPublicacion: async (req, res) => {
    try {
      const publicacion = await Publicacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!publicacion) {
        return res.status(404).json({ message: 'Publicación no encontrada' });
      }
      res.json(publicacion);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  eliminarPublicacion: async (req, res) => {
    try {
      const publicacionEliminada = await Publicacion.findByIdAndDelete(req.params.id);
      if (!publicacionEliminada) {
        return res.status(404).json({ message: 'Publicación no encontrada' });
      }
      res.json({ message: 'Publicación eliminada exitosamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = PublicacionesController;