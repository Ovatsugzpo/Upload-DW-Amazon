const mongo = require('mongoose')

module.exports = new mongo.Schema({
    EpisodeName: {type: String, default: undefined},
    SerieName: {type: String, default: 'Doctor Who'},
    Episode: {type: Number, default: null},
    Season: {type: Number, default: null},
    Url: {type: String, default: undefined},
    EspecialEpisode: {type:Boolean, default:false}
})