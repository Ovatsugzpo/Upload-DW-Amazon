const axios = require('axios')

module.exports = new class{
    async StartUploadToAmazon (Ep){
        return new Promise((resolve, reject)=>{
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
                maxContentLength: 100000000000000,
                maxBodyLength: 1000000000000000000000000
            }).then(data =>{
                console.log('foi')
                resolve(data)
            }).catch(err=>{
                reject(err)
            })
        })
    }
}