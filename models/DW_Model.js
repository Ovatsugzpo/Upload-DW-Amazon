const DW_Schema = require('../database/DW_Schema'),
      mongoose = require('mongoose'),
      DW_Model = mongoose.model('doctorwhoepisodes', DW_Schema)

module.exports = new class{
    async NewEpisode(EpisodeName, Episode, Season, Key, Url, SpecialEpisode){
        return new Promise(async (resolve, reject)=>{
            try {
                if (await this.EpExist(EpisodeName)){
                    reject('Episodio ja foi cadastrado')
                }else{
                    const episode = new DW_Model({EpisodeName, Episode, Season, Key, Url, SpecialEpisode})
                    episode.save()
                    resolve()
                }
            } catch (err) {
                reject(err)
            }
        })
    }
    async EpExist(EpisodeName){
        return new Promise((resolve, reject)=>{
            DW_Model.findOne({EpisodeName}).then(data=>{
                data ? resolve(true) : resolve(false)
            }).catch(err=>{
                reject(err)
            })
        })
    }
}