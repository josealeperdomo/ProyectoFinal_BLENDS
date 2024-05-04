const userModel = require('../models/users')

const getUsers = async (req,res)=>{
    const users = await userModel.find()
    res.status(200).json(users)
}

const createUser = async(req,res)=>{
    try {
        const {name, email, password, role} = req.body
        const user = await userModel.create({
            name, email, password : await userModel.encryptPassword(password), role
        })
        res.status(200).json({user})
    } catch (error) {
        res.status(400).json({message: 'Error al crear usuario'})
    }
}

module.exports(createUser)

//hola