const  mongoose = require("mongoose");

const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es necesario'],
        minLength: 3
    },
    apellido:{
        type: String,
        required: [true, 'El apellido es necesario'],
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

UserSchema.statics.comparePassword = async(password, hashPassword)=>{
    return await bcrypt.compare(password, hashPassword)
}

module.exports = mongoose.model('users', UserSchema)