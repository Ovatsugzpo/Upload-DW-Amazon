const EpsReadablesArray = require('./EpsReadablesArray'),
      Upload = require('./Upload'),
      DW_Model = require('./DW_Model')

module.exports = new class{
    async StartUpload(){
        try{
            const EpisodesReadables = await EpsReadablesArray.GetCreatedStreamEps()
            for (let i = 0; i < EpisodesReadables.length; i++) {
                let epExist = await DW_Model.EpExist(EpisodesReadables[i].Name)
                if (!epExist) {
                    await Upload.StartUploadToAmazon(EpisodesReadables[i])
                }
            }
        }catch(err){throw err}
    }
}