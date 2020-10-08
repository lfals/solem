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
exports.startScan = exports.stopScan = void 0;
const checksum_1 = __importDefault(require("checksum"));
require('dotenv').config();
const index_1 = __importDefault(require("../getTitlesService/index"));
const index_2 = require("../../index");
const urls = [process.env.URL];
const sitesToCrawl = urls;
const sitesWithHash = sitesToCrawl.map((url) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Setting up search for ${url}`);
    const { chapterString } = yield index_1.default();
    const hash = checksum_1.default(chapterString);
    return {
        url,
        hash,
    };
}));
function huntForChanges(index) {
    return __awaiter(this, void 0, void 0, function* () {
        const { url, hash } = yield sitesWithHash[index];
        const { chapterString, lastChapter, lastLink } = yield index_1.default();
        var oldHash = hash;
        var newHash = checksum_1.default(chapterString);
        if (newHash !== oldHash) {
            var oldHash = checksum_1.default(chapterString);
            index_2.messageFunction(lastChapter);
            index_2.messageFunction(`${lastLink}`);
            clearInterval(checkInterval);
            return oldHash;
        }
        console.log(`😓 Nothing to report on your search for ${url}.`);
    });
}
function checkURL(sites) {
    console.log(`🕵️  Checking for updates...`);
    sites.forEach((site, index) => __awaiter(this, void 0, void 0, function* () {
        yield huntForChanges(index);
    }));
}
var checkInterval;
function scheduleStuff() {
    console.log("schedulleStuff");
    checkInterval = setInterval(doStuff, 600000);
}
function doStuff() {
    if (sitesWithHash) {
        console.log("checkURL");
        checkURL(sitesWithHash);
    }
    else {
        console.log(`Please add URLs to your config file!`);
    }
}
function stopScan() {
    console.log('stopped');
    clearInterval(checkInterval);
}
exports.stopScan = stopScan;
function startScan() {
    scheduleStuff();
}
exports.startScan = startScan;
