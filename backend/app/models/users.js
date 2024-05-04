const  mongoose = require("mongoose");

const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    nombre:{
        type: String,
        minLength: 3
    },
    apellido:{
        type: String,
        minLength: 3
    },
    usuario:{
        type: String,
        required: [true, 'El usuario es necesario'],
        minLength: 3
    },
    email:{
        type:String,
        unique: true,
        required: [true, 'El correo es obligatorio'],
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    imagen_perfil:{
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/019/879/198/original/user-icon-on-transparent-background-free-png.png"
    },
    amigos:{
        type: String
    },
    biografia:{
        type: String,
        maxLength: 255
    }
    ,
    membresia: {
        type: String,
        required: true,
        default: 'normal',
        minLength: 6,
        maxLength: 7
    },
    rol: {
        type: String,
        required: true,
        default: 'user',
        minLength: 4,
        maxLength: 5
    }
},{
    timestamos:true,
    versionKey: false
})

UserSchema.statics.encryptPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt).then((hashPassword)=>{
        return hashPassword
    })
}

UserSchema.methods.setImg = (filename)=>{
    host = process.env.HOST
    port = process.env.PORT
    this.imagen_perfil = `${host}:${port}/public/${filename}`
}

UserSchema.statics.comparePassword = async(password, hashPassword)=>{
    return await bcrypt.compare(password, hashPassword)
}

module.exports = mongoose.model('users', UserSchema)