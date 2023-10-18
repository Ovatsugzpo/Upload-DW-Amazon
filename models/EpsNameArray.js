const fs = require('fs/promises')
module.exports = new class{
    async GetNameEpisodes() {
        try {
            const htmlTxT = await fs.readFile(`${__dirname}/../src/html.txt`),
                htmlString = htmlTxT.toLocaleString()
            let Seasons = [],
                SeasonsHtml = htmlString.split(/<span style="font-size: x-large;"><strong>\d+ª Temporada<\/strong><\/span>/)
                SeasonsHtml.shift()
    
            SeasonsHtml.forEach(async (Season) => {
                try {
                    let regexEps = /<strong>Episódio \d+ - <\/strong>(.*?) - <a/g,
                        matchesEps = Season.match(regexEps),
                        regexEsp = /<strong>Especial - <\/strong>(.*?) - <a/g,
                        matchesEsp = Season.match(regexEsp),
                        regexEsp2 = /<strong>Especial<\/strong> - (.*?) - <a/g,
                        matchesEsp2 = Season.match(regexEsp2),
        
                        Matchs = await this.getArrayMatches(matchesEps, matchesEsp, matchesEsp2)
        
                    let ConcatedNames = Matchs[0]
                    ConcatedNames = Matchs[1] != undefined ? Matchs[0].concat(Matchs[1]) : Matchs[0]
                    ConcatedNames = Matchs[2] != undefined ? Matchs[0].concat(Matchs[2]) : ConcatedNames
        
                    Seasons.push(ConcatedNames)
                } catch (err) {throw err}
            })
            return Seasons
        } catch (err) {throw err}
    }
    async getArrayMatches(matchEpisode, matchEspecial, matchEspacial2){
        let EpisodesName,
            EpisodesNameEspecial,
            EpisodesNameEspecial2

        if (matchEpisode) {
            EpisodesName = matchEpisode.map(match=>{
                return match.replace(/<strong>Episódio \d+ - <\/strong>(.*?) - <a/g, '$1')
            })
        }if(matchEspecial){
            EpisodesNameEspecial = matchEspecial.map(match=>{
                return match.replace(/<strong>Especial - <\/strong>(.*?) - <a/g, '$1')
            })
        }if(matchEspacial2){
            EpisodesNameEspecial2 = matchEspacial2.map(match=>{
                return match.replace(/<strong>Especial<\/strong> - (.*?) - <a/g, '$1')
            })
        }
        return [EpisodesName, EpisodesNameEspecial, EpisodesNameEspecial2]
    }
}