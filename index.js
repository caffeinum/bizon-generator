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

let phrase = process.argv[2] || generatePhrase(20)

let phrases = Array(10).fill(null).map( () => generatePhrase(20) )

const translatePhrase = (phrase) => translate(phrase, {from: 'lb', to: 'ru'})

Promise.all(phrases.map((phrase) => translatePhrase(phrase)))
  .then(trans => trans.filter( t => CAPS.includes(t.text[0]) ) )
  .then(trans => trans.map( t => t.text ) )
  .then(trans => console.log(trans))


