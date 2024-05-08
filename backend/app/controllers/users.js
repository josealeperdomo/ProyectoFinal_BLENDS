const userModel = require('../models/users')

const getUsers = async (req,res)=>{
    const users = await userModel.find()
    res.status(200).json(users)
}

const createUser = async(req,res)=>{
    try {
        const {nombre, apellido, usuario, email, password, imagen_perfil, rol} = req.body
        const user = await userModel.create({
            nombre, apellido, usuario, email, password : await userModel.encryptPassword(password), imagen_perfil, rol
        })
        res.status(200).json({user})
    } catch (error) {
        res.status(400).json({message: 'Error al crear usuario'})
    }
}

module.exports(createUser)