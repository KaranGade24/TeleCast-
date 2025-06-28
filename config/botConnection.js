const telegram = require("node-telegram-bot-api");
const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new telegram(BOT_TOKEN, { polling: true });

module.exports = { bot };
