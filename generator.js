const translate = require('google-translate-api')

const generateArray = (first, last) =>
  Array( last - first + 1 ).fill( first ).map( ( letter, index ) => String.fromCharCode( letter + index ) )

let exclude = 'ыъщ'.split("")

let syll = 'аеиоуэюя'.split("")

let letters = generateArray('а'.charCodeAt(0), 'я'.charCodeAt(0))
let CAPS = generateArray('А'.charCodeAt(0), 'Я'.charCodeAt(0))

let alphabet = letters//.filter(elem => !exclude.includes(elem))

const randomIndex = (arr) => Math.floor(Math.random() * arr.length)

const generatePhrase = (n) =>
  Array( n ).fill( 1 )
    .map( () => Math.ceil(Math.random() * Math.random() * 10) + 1 )
    .map( (len) => Array( len ).fill(" ").map( () => alphabet[ randomIndex(alphabet) ] ).join("") )
    .join(" ")

const translatePhrase = (phrase, lang) => translate(phrase, {from: 'lb', to: lang || 'ru'})

const generatePromise = (phrases) => Promise.all(phrases.map((phrase) => translatePhrase(phrase)))
  .then(trans => trans.filter( t => CAPS.includes(t.text[0]) ) )
  .then(trans => trans.map( t => t.text ) )

const generate = () => {
  let phrases = Array(10).fill(null).map( () => generatePhrase(20) )
  return generatePromise(phrases)
}

module.exports = { generate, generatePhrase, translatePhrase }
