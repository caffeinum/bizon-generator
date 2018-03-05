const TelegramBot = require('node-telegram-bot-api')
const { generate, generatePhrase, translatePhrase } = require('./generator')

const token = process.env.BIZON_TOKEN
let LANG = process.env.BIZON_LANG || 'ru'

if ( !token ) {
  console.error('No token! Provide env.var BIZON_TOKEN')
  process.exit(1)
}

const bot = new TelegramBot(token, {polling: true})

bot.onText(/\/say (.+)/, (msg, match) => {
  const chatId = msg.chat.id
  const resp = match[1]
  if ( resp == 'ru' || resp == 'en' ) LANG = resp

  translatePhrase(generatePhrase(15), LANG)
    .then( trans => bot.sendMessage(chatId, trans.text) )
})

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  console.log('message', msg.chat, msg.text)
  generate().then ( trans => bot.sendMessage(chatId, trans[0]) )
})
