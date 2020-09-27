import axios from 'axios'
import cheerio from 'cheerio'

const caps:Array<string> = []


const pegandoDados = async(url: string) => {
    const response = await axios.get(url)
    return response.data
}

const getLastChapter = async ()=>{
    const content = await pegandoDados('https://neoxscans.com/manga/14357/') 
    const $ = cheerio.load(content,{
        normalizeWhitespace: true,
        xmlMode: true
    })

    $('.wp-manga-chapter').each((i, e) => {
        caps[i] = $(e).text()
    })

    const lastChapter = caps[0]
    return lastChapter
}

export default getLastChapter;