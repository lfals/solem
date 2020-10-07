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
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
require('dotenv').config();
const caps = [];
const link = [];
const pegandoDados = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(url);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
});
const getLastChapter = () => __awaiter(void 0, void 0, void 0, function* () {
    const content = yield pegandoDados(`${process.env.URL}`);
    let chapterString = "";
    const $ = cheerio_1.default.load(content, {
        normalizeWhitespace: true,
        xmlMode: true
    });
    $('.wp-manga-chapter > a').each((i, e) => {
        caps[i] = $(e).text();
        link[i] = $(e).attr('href');
        chapterString += `${$(e).text()}`;
    });
    const lastChapter = caps[0];
    const lastLink = link[0];
    const responses = {
        lastLink,
        lastChapter,
        chapterString,
    };
    return responses;
});
exports.default = getLastChapter;
