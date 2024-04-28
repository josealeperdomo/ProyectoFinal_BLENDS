const mongoose = require('mongoose')

const dbConnect = () =>{
    mongoose.connect('mongodb://localhost27017/redsocial')
    .then(()=>{
        console.log('Conexion exitosa a la base de datos')
    })
    .catch(error =>{
        console.error('ERROR AL CONECTAR CON LA BASE DE DATOS', error);
    })
}

module.exports = { dbConnect }