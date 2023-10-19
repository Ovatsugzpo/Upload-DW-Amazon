const axios = require('axios'),
      DW_Model = require('./DW_Model')

module.exports = new class{
    async StartUploadToAmazon (Ep){
        return new Promise((resolve, reject)=>{
            if (DW_Model.EpExist(Ep.Name, Ep.Episode, Ep.Season)){
                resolve()
            }else{
                axios({
                    method: 'post',
                    url: 'http://localhost:3000/uploadEpisode',
                    data: {
                        file: Ep.StreamReadable,
                        Season: Ep.Season,
                        Episode: Ep.Episode,
                        Name: Ep.Name,
                        SpecialEpisode: Ep.SpecialEpisode
                    },
                    headers: {'content-type': 'multipart/form-data'},
                    maxContentLength: 100000000,
                    maxBodyLength: 1000000000
                }).then(data =>{
                    resolve(data)
                }).catch(err=>{
                    reject(err)
                })
            }
        })
    }
}