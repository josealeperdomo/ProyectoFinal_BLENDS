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
        regpassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/
        if(!reguser.test(usuario)){
            return res.status(400).json({"Message":"usuario invalido"})
        }
        if(!regemail.test(email)){
            console.log(email)
            return res.status(400).json({"Message":"email invalido"})
            
        }
        if(!regpassword.test(password)){
            return res.status(400).json({"Message":"password invalido"})
        }
        const user = await userModel.create({
            nombre, apellido, usuario, email, password : await userModel.encryptPassword(password), rol
        })
        res.status(200).json({user})
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