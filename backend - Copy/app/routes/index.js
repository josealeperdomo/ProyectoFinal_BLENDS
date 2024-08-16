const express = require('express')
const router = express.Router()
const fs = require('fs') //para interactuar con el sistema de archivos

const pathRouter = `${__dirname}` // es una variable globlal en node js que representa la ruta del directorio del archivo en el quew se encuentra el archivo actual.

const removeExtension = (fileName)=>{
    return fileName.split(".").shift(); //elimina y devuelve el primer elemento del array
}

fs.readdirSync(pathRouter).filter((file)=>{
    // lee de forma sincrona el directorio actual y filtra solo los archivos que terminen en .
    const fileWithOutExt = removeExtension(file)

    const skip = ['index'].includes(fileWithOutExt)  // Esto crew un array con un solo elemento, en este caso, el nombre del archivo "Index". Esta es la lista de archivo que se deben omitir

    if(!skip){
        router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`))
    }
})

router.get('*', (req,res)=>{
    res.status(404).json({error: "Ruta no encontrada"})
})

module.exports = router