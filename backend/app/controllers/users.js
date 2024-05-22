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

const createUser = async (req, res) => {
    try {
        const {nombre, apellido, usuario, email, password, rol} = req.body
        reguser = /^[a-zA-Z0-9_-]{3,16}/
        regemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        regpassword = /^.{8,16}$/
        

        if (!nombre || !usuario || !email || !password) {
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

            await user.setImg(req.file.filename); // Usar req.file.filename en lugar de generatedFileName
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
        const { nombre, apellido, usuario, email, password, rol } = req.body;

        const user = await userModel.findByIdAndUpdate(id, {
            nombre,
            apellido,
            usuario,
            email,
            password: await userModel.encryptPassword(password),
            rol
        }, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Usuario actualizado', user });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar usuario' });
    }
};

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

module.exports = { getUsers, getUser, createUser, cambiarImagen, updateUser, deleteUser };
