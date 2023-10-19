const EpsReadablesArray = require('./EpsReadablesArray'),
    Upload = require('./Upload')

module.exports = new class{
    async StartUpload(){
        try{
            const EpisodesReadables = await EpsReadablesArray.GetCreatedStreamEps()
            for (let i = 0; i < EpisodesReadables.length; i++) {
                await Upload.StartUploadToAmazon(EpisodesReadables[i])
            }
        }catch(err){throw err}
    }
}