require('./database/connection')

const express = require('express'),
    app = express(),
    multer = require('multer'),
    multerConf = require('./src/config/multer'),
    DW_Model = require('./models/DW_Model'),
    StartUpload = require('./models/StartUpload'),
    env = require('dotenv')
    
env.config()
app.use(express.json({limit:'100gb'}))
app.use(express.urlencoded({extended:true, limit:'100gb'}))

app.post('/uploadEpisode', multer(multerConf).single('file'), (req, res)=>{
    let {Season, Episode, Name:EpisodeName, SpecialEpisode} = req.body,
        {location: Url, key:Key} = req.file

    Episode = Episode == 'ES' ? undefined : Episode
    Url = process.env.AWS_FRONT + Url.split('/').at(-1)

    DW_Model.NewEpisode(EpisodeName, Episode, Season, Key, Url, SpecialEpisode).then(episode=>{
        res.status(200).send({episode})
    }).catch(err=>{
        res.status(400).send({err})
        throw err
    })
})

app.listen('3000',(x)=>{
    StartUpload.StartUpload().then(data=>{console.log(data)}).catch(err=>{throw err})
})