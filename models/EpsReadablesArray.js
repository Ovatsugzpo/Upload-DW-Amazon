const fsNP = require('fs'),
    pathSeasons = 'D:/reworkDW_Temps',
    S_E_Arrays = require('./S_E_Arrays'),
    NamesArray = require('./EpsNameArray')

module.exports = new class {
    async GetCreatedStreamEps() {
        try {
            let EpisodesStreamed = []
            const Seasons = await S_E_Arrays.GetSeasons(),
                  NamesEpisodes = await NamesArray.GetNameEpisodes()

            for (let S = 0; S < Seasons.length; S++) {
                const Season = Seasons[S]
                try {
                    const Episodes = await S_E_Arrays.GetEpisodes(S)
                    Episodes.map((Episode, indexEp)=>{
    
                        let StreamEp = fsNP.createReadStream(`${pathSeasons}/${Season}/${Episode}`),
                            E = Episode.slice(Episode.length - 6, Episode.length - 4)
                        E = !isNaN(E) ? parseInt(E) : E 
                        
                        let Special = E == 'ES' ? true : false

                        EpisodesStreamed.push({
                            StreamReadable: StreamEp,
                            Season: S + 1,
                            Episode: E,
                            Name: NamesEpisodes[S][indexEp],
                            SpecialEpisode: Special
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