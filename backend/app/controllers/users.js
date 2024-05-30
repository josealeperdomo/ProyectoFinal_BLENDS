const userModel = require('../models/users')
const bcrypt = require('bcrypt')
const multer = require('multer')
const path = require('path')
const uuid = require('uuid')

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario' });
    }
};

const getAmigos = async (req, res) => {
    try {
        const userId = req.params.id;
        const usuario = await userModel.findById(userId).populate('amigos', 'nombre usuario email imagen_perfil biografia membresia');

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const amigos = usuario.amigos;

        if (amigos.length === 0) {
            return res.status(200).json({ message: 'El usuario no tiene amigos' });
        }

        res.status(200).json(amigos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener amigos', error: error.message });
    }
}



const createUser = async (req, res) => {
    try {
        const {nombre, apellido, usuario, email, password, rol} = req.body
        const reguser = /^[a-zA-Z0-9_-]{3,16}/
        const regemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const regpassword = /^.{8,16}$/
        

        if ( !usuario || !email || !password) {
            return res.status(400).json({"Message":"Todos los campos son requeridos"})
        }
        

        const existingUser = await userModel.findOne({ $or: [{ usuario }, { email }] });
        if (existingUser) {
            return res.status(400).json({"Message":"El nombre de usuario o correo electrónico ya están registrados"})
        }
        
        if(!reguser.test(usuario)){
            return res.status(400).json({"Message":"Usuario inválido"})
        }
        if(!regemail.test(email)){
            console.log(email)
            return res.status(400).json({"Message":"Correo inválido"})
        }
        if(!regpassword.test(password)){
            return res.status(400).json({"Message":"Contraseña inválida"})
        }
        const newUser = {
            nombre,
            apellido,
            usuario,
            email,
            password: await userModel.encryptPassword(password),
            rol
        };
        const user = await userModel.create(newUser);
        res.status(200).json({"Message":"Usuario Creado", "user": user})
    } catch (error) {
        res.status(400).json({message: 'Error al crear usuario'})
        console.log(error)
    }
};


let generatedFileName

const storage = multer.diskStorage({
    destination: 'storage/imgs',
    filename: (req, file, cb) => {
        generatedFileName = uuid.v4() + path.extname(file.originalname);
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
        cb(new Error('ERROR: El archivo debe ser una imagen valida'));
    }
}).single('imagen_perfil');

const cambiarImagen = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            const { id } = req.params;
            const user = await userModel.findById(id);

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            await user.setImg(req.file.filename);
            await user.save();

            res.status(200).json({ user });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al cambiar la imagen del usuario' });
        }
    });
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, usuario, email, password, rol, biografia } = req.body;

        const user = await userModel.findByIdAndUpdate(id, {
            nombre,
            apellido,
            usuario,
            email,
            password: await userModel.encryptPassword(password),
            rol,
            biografia
        }, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Usuario actualizado', user });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar usuario' });
        console.log(error);
        }
};

    const cambiarContrasena = async (req, res) => {
    const idUsuario = req.params.id;
    const { anteriorContrasena, nuevaContrasena } = req.body;
  
    try {
      // Buscar el usuario por su ID
      const usuario = await userModel.findById(idUsuario);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Verificar si la contraseña anterior coincide
      console.log(anteriorContrasena);
      const contrasenaCoincide = await userModel.comparePassword(anteriorContrasena, usuario.password);
      if (!contrasenaCoincide) {
        return res.status(400).json({ error: 'La contraseña anterior es incorrecta' });
      }
  
      // Encriptar la nueva contraseña
      const nuevaContrasenaEncriptada = await userModel.encryptPassword(nuevaContrasena);
  
      // Actualizar la contraseña del usuario
      usuario.password = nuevaContrasenaEncriptada;
      await usuario.save();
  
      return res.status(200).json({ mensaje: 'Contraseña cambiada exitosamente' });
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

    const mostrarUsuariosRandoms = async (req, res) => {
    try {
        const usuariosRandoms = await userModel.aggregate([
            { $sample: { size: 3 } } // $sample para obtener una muestra aleatoria de documentos
        ]);
        res.status(200).json(usuariosRandoms);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener usuarios aleatorios' });
        
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar usuario' });
    }
};

const obtenerUsuarioPorUser = async (req, res) => {
    try {
      let { user } = req.params; // Obtener el parámetro 'user' de la consulta
      user = user.toLowerCase(); // Convertir el nombre de usuario a minúsculas
  
      // Buscar el usuario por su nombre de usuario en la base de datos (insensible a mayúsculas y minúsculas)
      const usuario = await userModel.findOne({ usuario: { $regex: new RegExp(user, 'i') } });
  
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      res.status(200).json(usuario);
    } catch (error) {
      console.error('Error al obtener el usuario por user:', error);
      res.status(500).json({ message: 'Error al obtener el usuario por user' });
    }
  };

module.exports = { getUsers, getUser, getAmigos, createUser, cambiarImagen, updateUser, deleteUser, cambiarContrasena, mostrarUsuariosRandoms, obtenerUsuarioPorUser};
