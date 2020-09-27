"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const config_json_1 = __importDefault(require("./config.json"));
require("dotenv/config");
const index_1 = __importDefault(require("./services/getTitlesService/index"));
// import counter from './services/scanForLast/index'
const bot = new node_telegram_bot_api_1.default(config_json_1.default.token, { polling: true });
// let testNum = counter()
// Bot Commands ---------------------------------------------
bot.onText(/\/last/, (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Buscando ...⏳`);
    const lastChapter = yield index_1.default();
    setTimeout(() => {
        bot.sendMessage(chatId, `Último capítulo: ${lastChapter}`);
    }, 1000);
}));
// bot.onText(/\/test/, (msg) => {
//     const chatId = msg.chat.id;
//     bot.sendMessage(chatId, `teste: ${testNum}`)
//   });
