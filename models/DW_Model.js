const DW_Schema = require('../database/DW_Schema'),
      mongoose = require('mongoose'),
      DW_Model = mongoose.model('doctorwhoepisodes', DW_Schema)

module.exports = new class{
    async NewEpisode(EpisodeName, Episode, Season, Key, Url, SpecialEpisode){
        return new Promise((resolve, reject)=>{
            if (this.EpExist(EpisodeName, Episode, Season)){
                reject('Episodio ja foi cadastrado')
            }else{
                const episode = new DW_Model({EpisodeName, Episode, Season, Key, Url, SpecialEpisode})
                episode.save()
                resolve()
            }
        })
    }
    async EpExist(EpisodeName, Episode, Season){
        return new Promise((resolve, reject)=>{
            DW_Model.findOne({EpisodeName, Episode, Season}).then(data=>{
                data ? resolve(true) : resolve(false)
            }).catch(err=>{
                reject(err)
            })
        })
    }
}