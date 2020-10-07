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
exports.messageFunction = void 0;
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const config_json_1 = __importDefault(require("./config.json"));
const index_1 = __importDefault(require("./services/getTitlesService/index"));
const index_2 = require("./services/scanForLast/index");
const bot = new node_telegram_bot_api_1.default(config_json_1.default.token, { polling: true });
const ids = [];
index_2.startScan();
// Bot Commands ---------------------------------------------
bot.onText(/\/last/, (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Buscando ...⏳`);
    const { lastChapter, lastLink } = yield index_1.default();
    setTimeout(() => {
        bot.sendMessage(chatId, `Último capítulo: ${lastChapter}`);
        bot.sendMessage(chatId, `${lastLink}`);
    }, 1000);
}));
bot.onText(/\/lista/, (msg) => {
    const chatId = msg.chat.id;
    ids.forEach(id => {
        bot.sendMessage(chatId, `${id}`);
    });
});
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "O bot busca automaticamente por capítulos novos, caso queira ser avisado, basta digitar /scan");
});
bot.onText(/\/scan/, (msg) => {
    const chatId = msg.chat.id;
    if (ids.indexOf(chatId) === -1) {
        bot.sendMessage(chatId, `Adicionando chat ${chatId} na lista`);
        ids.push(chatId);
        console.log(`Id: ${chatId} adicionado`);
        return;
    }
    else {
        bot.sendMessage(chatId, `ja ta na lista o puta safada`);
    }
});
function messageFunction(text) {
    ids.forEach(id => {
        bot.sendMessage(`${id}`, text);
    });
}
exports.messageFunction = messageFunction;
