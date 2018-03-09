#!/usr/bin/env node
const { generate, generateCats, generatePhrase } = require('./generator')

const LANG = process.env.BIZON_LANG || 'ru'

let phrase = process.argv[2] || generatePhrase(20)

// generate(LANG).then(trans => console.log(trans))
let cats = generateCats('en')

if (process.argv[2] == '--concat') {
  cats.then(trans => console.log(trans.join(" "))).catch(console.error)
} else {
  cats.then(trans => console.log(trans)).catch(console.error)
}
