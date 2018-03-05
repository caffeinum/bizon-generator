const { generate, generatePhrase, translatePhrase } = require('./generator')

const LANG = process.env.BIZON_LANG || 'ru'

let phrase = process.argv[2] || generatePhrase(20)

generate().then(trans => console.log(trans))
