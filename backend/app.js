require('dotenv').config()
const express = require('express')
const cors = require("cors")
const multer = require('multer')
const uuid = require('uuid')
const app = express()
const { dbConnect } = require('./config/mongo')

dbConnect()

const PORT = process.env.PORT || 3000
app.use(cors())

app.use(express.json())
app.use('/public', express.static(`${__dirname}/storage/imgs`))

app.use('/api/', require("./app/routes"))



app.listen(PORT, ()=>{
    console.log('La API esta lista');
})