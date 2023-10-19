const DW_Schema = require('../database/DW_Schema'),
      mongoose = require('mongoose'),
      DW_Model = mongoose.model('doctorwhoepisodes', DW_Schema)

module.exports = new class{
    async NewEpisode(EpisodeName, Episode, Season, Key, Url, SpecialEpisode){
        return new Promise((resolve, reject)=>{
            const episode = new DW_Model({EpisodeName, Episode, Season, Key, Url, SpecialEpisode})
            episode.save()
            resolve()
        })
    }
}