const userModel = require('../models/users')
const bcrypt = require('bcrypt')

const getUsers = async (req,res)=>{
    const users = await userModel.find()
    res.status(200).json(users)
}

const createUser = async(req,res)=>{
    try {
        const {nombre, apellido, usuario, email, password, rol} = req.body
        reguser = /^[a-zA-Z0-9_-]{3,16}/
        regemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        regpassword = /^.{8,16}$/
        
        // Validar campos requeridos
        if (!nombre || !usuario || !email || !password) {
            return res.status(400).json({"Message":"Todos los campos son requeridos"})
        }
        
        // Verificar si el usuario ya existe
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
        // Crear usuario con valores predeterminados si no se proporcionan
        const newUser = {
            nombre: nombre || userModel.schema.obj.nombre.default,
            apellido: apellido || userModel.schema.obj.apellido.default,
            usuario,
            email,
            password: await userModel.encryptPassword(password),
            rol: rol || userModel.schema.obj.rol.default
        };
        const user = await userModel.create(newUser);
        res.status(200).json({"Message":"Usuario Creado", "user": user})
    } catch (error) {
        res.status(400).json({message: 'Error al crear usuario'})
        console.log(error)
    }
}

const cambiarImagen = async(req,res)=>{
    try{
        const { id } = req.params
        const {imagen_perfil} = req.file
        const user = await userModel.findByIdAndUpdate(id,{
            imagen_perfil: userModel.setImg(imagen_perfil)
        })
        res.status(200).json({user})
    }catch (error) {
        res.status(400).json({message: 'Error al crear usuario'})
        console.log(error)
    }
}

module.exports = {getUsers, createUser, cambiarImagen}
