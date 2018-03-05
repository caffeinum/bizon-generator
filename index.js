const { generate, generateCats, generatePhrase } = require('./generator')

const LANG = process.env.BIZON_LANG || 'ru'

let phrase = process.argv[2] || generatePhrase(20)

// generate(LANG).then(trans => console.log(trans))
generateCats('en').then(trans => console.log(trans))
