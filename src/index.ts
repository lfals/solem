import TelegramBot from 'node-telegram-bot-api'
import config from './config.json'

import 'dotenv/config'


import getLastChapter from './services/getTitlesService/index'
// import counter from './services/scanForLast/index'


const bot = new TelegramBot(config.token, {polling: true})

// let testNum = counter()

// Bot Commands ---------------------------------------------
bot.onText(/\/last/, async (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId,`Buscando ...⏳`)

    const lastChapter = await getLastChapter()

    setTimeout(() => {
        bot.sendMessage(chatId,`Último capítulo: ${lastChapter}`)
    }, 1000); 

})

// bot.onText(/\/test/, (msg) => {

//     const chatId = msg.chat.id;

//     bot.sendMessage(chatId, `teste: ${testNum}`)

//   });


