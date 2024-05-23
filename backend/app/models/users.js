const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    nombre:{
        type: String,
        minLength: 3
    },
    amigos: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: []
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
        default: "http://localhost:3000/public/img-user.png"
    },
    amigos:{
        type: Object,
        default: {}
    },
    biografia:{
        type: String,
        default: "¡Hola soy nuevo en Blends!",
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
    timestamps:true,
    versionKey: false
})

UserSchema.statics.encryptPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt).then((hashPassword)=>{
        return hashPassword
    })
}

UserSchema.methods.setImg = function(imagen_perfil) {
    const host = process.env.HOST
    const port = process.env.PORT
    this.imagen_perfil = `${host}:${port}/public/${imagen_perfil}`
}


UserSchema.statics.comparePassword = async(password, hashPassword)=>{
    return await bcrypt.compare(password, hashPassword)
}

module.exports = mongoose.model('User', UserSchema);
