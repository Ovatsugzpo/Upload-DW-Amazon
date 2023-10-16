const fsNP = require('fs'),
    pathSeasons = 'D:/reworkDW_Temps',
    S_E_Arrays = require('./models/S_E_Arrays')

module.exports = new class {
    async GetCreatedStreamEps() {
        try {
            let EpisodesStreamed = []
            const Seasons = await S_E_Arrays.GetSeasons()
    
            for (let S = 0; S < Seasons.length; S++) {
                const Season = Seasons[S]
                try {
                    const Episodes = await S_E_Arrays.GetEpisodes(S)
                    Episodes.map((Episode)=>{
    
                        let StreamEp = fsNP.createReadStream(`${pathSeasons}/${Season}/${Episode}`)
                        let E = Episode.slice(Episode.length - 6, Episode.length - 4)
                        E = !isNaN(E) ? parseInt(E) : E 
                        
                        EpisodesStreamed.push({
                            StreamReadable: StreamEp,
                            Season: S + 1,
                            Episode: E
                        })
                    })
    
                } catch (err) {
                    throw err
                }
                
            }
            return EpisodesStreamed
    
        } catch (err) {
            throw err
        }
    }
}