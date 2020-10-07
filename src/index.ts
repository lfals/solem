import TelegramBot from 'node-telegram-bot-api'

require('dotenv').config()

import getLastChapter from './services/getTitlesService/index'
import { startScan } from './services/scanForLast/index'


const bot = new TelegramBot(`${process.env.TOKEN}`, {polling: true})

const ids:Array<Number> = []

startScan()


// Bot Commands ---------------------------------------------
bot.onText(/\/last/, async (msg) => {
    const chatId = msg.chat.id;


    bot.sendMessage(chatId,`Buscando ...⏳`)

    const { lastChapter, lastLink } = await getLastChapter()

    setTimeout(() => {
        bot.sendMessage(chatId,`Último capítulo: ${lastChapter}`)
        bot.sendMessage(chatId,`${lastLink}`)
    }, 1000); 

})

bot.onText(/\/lista/, (msg) => {
    const chatId = msg.chat.id


    ids.forEach(id => {
        bot.sendMessage(chatId,`${id}` )
    });
    
})

bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id

    bot.sendMessage(chatId, "O bot busca automaticamente por capítulos novos, caso queira ser avisado, basta digitar /scan")
    
})

bot.onText(/\/scan/, (msg) => {
    const chatId = msg.chat.id

    if(ids.indexOf(chatId) === -1){
        bot.sendMessage(chatId, `Adicionando chat ${chatId} na lista`)
        ids.push(chatId)
        console.log(`Id: ${chatId} adicionado`)
        return
    } else {
        bot.sendMessage(chatId, `ja ta na lista o puta safada`)
    }


    
})



export function messageFunction(text:string){
    ids.forEach(id => {
        bot.sendMessage(`${id}`, text)
    });
}