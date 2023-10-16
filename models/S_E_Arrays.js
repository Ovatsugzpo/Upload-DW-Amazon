const fs = require('fs/promises'),
    pathSeasons = 'D:/reworkDW_Temps'

module.exports = new class{

    async OrderSeasons(arr) {
        let sorted = arr.sort((a, b)=>{
            let n1 = parseInt(a.match(/\d+/)[0]),
                n2 = parseInt(b.match(/\d+/)[0])
            if (n1 < n2){
                return -1
            }else if(n1 > n2){
                return 1
            }else{
                return 0
            }
        })  
        return new Promise((resolve, reject)=>{
            if (!sorted) reject('A ordenação falhou')
            resolve(sorted)
        }) 
    }
    async GetSeasons() {
        try {
            let Seasons = await this.OrderSeasons(await fs.readdir(pathSeasons))
            return Seasons
        } catch (err) {
            throw err
        }
    }
    async GetEpisodes(Season) {
        try {
            const Seasons = await this.GetSeasons()
            let Episodes = await fs.readdir(`${pathSeasons}/${Seasons[Season]}`)
            return Episodes
        } catch (err) {
            throw err
        }
    }
}