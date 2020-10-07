import axios from 'axios'
import cheerio from 'cheerio'

import { url } from '../../config.json'

const caps:Array<string> = []
const link:Array<string | undefined> = []


const pegandoDados = async(url: string) => {
   try {
        const response = await axios.get(url)
        return response.data
   } catch (error) {
       console.log(error)
   }
}

const getLastChapter = async ()=>{
    const content = await pegandoDados(url) 
    let chapterString = "";
    const $ = cheerio.load(content,{
        normalizeWhitespace: true,
        xmlMode: true
    })

    $('.wp-manga-chapter > a').each((i, e) => {
        caps[i] = $(e).text()
        link[i] = $(e).attr('href')
        chapterString += `${$(e).text()}`
    })
  

    const lastChapter = caps[0]
    const lastLink = link[0]
    const responses = {
        lastLink,
        lastChapter,
        chapterString,
    }
    return responses 
}

export default getLastChapter;