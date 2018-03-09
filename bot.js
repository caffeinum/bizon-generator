const TelegramBot = require('node-telegram-bot-api')
const { generate, generateCats, generatePhrase, translatePhrase } = require('./generator')

const token = process.env.BIZON_TOKEN
let LANG = process.env.BIZON_LANG || 'ru'

if ( !token ) {
  console.error('No token! Provide env.var BIZON_TOKEN')
  process.exit(1)
}

const bot = new TelegramBot(token, {polling: true})

bot.onText(/\/say( (.+))?/, (msg, match) => {
  const chatId = msg.chat.id
  const resp = match[1]
  if ( resp == 'ru' || resp == 'en' ) LANG = resp

  translatePhrase(generatePhrase(15), LANG)
    .then( trans => bot.sendMessage(chatId, trans.text) )
    .catch( err => bot.sendMessage(chatId, err) )
})

bot.onText(/\/cat( (.+))?/, (msg, match) => {
  const chatId = msg.chat.id;
  generateCats('en').then ( trans => trans.length ? bot.sendMessage(chatId, trans[0]) : null )
})

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  console.log('message', msg.chat, msg.text)
  generate()
    .then ( trans => {
      if (!trans.length) throw new Error("Empty google translate result")
      return trans
    })
    .then ( trans => bot.sendMessage(chatId, trans[0]) )
    .catch( err => console.error(err) )
})
