"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const accountSid = config_1.default.get(`twilio.account`);
const authToken = config_1.default.get(`twilio.token`);
function SMS({}) {
    console.log("📲  Sending the message...");
}
module.exports = {
    SMS
};
