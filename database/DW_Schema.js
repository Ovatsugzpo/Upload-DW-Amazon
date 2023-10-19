const mongo = require('mongoose')

module.exports = new mongo.Schema({
    EpisodeName: {type: String, default: ''},
    SerieName: {type: String, default: 'Doctor Who'},
    Episode: {type: Number, default: null},
    Season: {type: Number, default: null},
    Key: {type: String, default: ''},
    Url: {type: String, default: ''},
    SpecialEpisode: {type:Boolean, default:false}
})