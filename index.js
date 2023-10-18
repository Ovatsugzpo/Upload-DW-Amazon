require('./database/connection')

const express = require('express'),
    app = express(),
    multer = require('multer')
    multerConf = require('./src/config/multer')

app.use(express.json({limit:'100gb'}))
app.use(express.urlencoded({extended:true, limit:'100gb'}))


app.listen('3000')