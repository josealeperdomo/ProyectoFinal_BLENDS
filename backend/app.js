require('dotenv').config()
const express = require('express')
const cors = require("cors")
const multer = require('multer')
const uuid = require('uuid')
const app = express()
const { dbConnect } = require('./config/mongo')
const path = require('path')

dbConnect()

const storage = multer.diskStorage({
    destination: 'storage/imgs',
    filename: (req,file,cb)=>{
        cb(null, uuid.v4() + path.extname(file.originalname));
    }
})

const PORT = process.env.PORT || 3000
app.use(cors())
app.use(multer({
    storage,
    dest: 'storage/imgs',
    fileFilter: (req,file,cb) =>{
        const fileTypes = /jpeg|jpg|png/
        const mimetype = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))
        if(mimetype && extname){
            return cb(null, true)
        }
        cb("ERROR: El archivo debe ser una imagen valida")
    }
}).single('imagen_perfil'))

app.use(express.json())
app.use('/public', express.static(`${__dirname}/storage/imgs`))
console.log(__dirname)
app.use('/api/', require("./app/routes"))



app.listen(PORT, ()=>{
    console.log('La API esta lista');
})