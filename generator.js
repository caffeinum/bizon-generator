const translate = require('google-translate-api')

const generateArray = (first, last) =>
  Array( last - first + 1 ).fill( first ).map( ( letter, index ) => String.fromCharCode( letter + index ) )

let exclude = 'ыъщ'.split("")

let syll = 'аеиоуэюя'.split("")

let LANGS = {
  'ru': {
    letters: generateArray('а'.charCodeAt(0), 'я'.charCodeAt(0)),
    caps: generateArray('А'.charCodeAt(0), 'Я'.charCodeAt(0)),
    cat: 'кошка',
  },
  'en': {
    letters: generateArray('a'.charCodeAt(0), 'z'.charCodeAt(0)),
    caps: generateArray('A'.charCodeAt(0), 'Z'.charCodeAt(0)),
    cat: 'cat',
  },
}

let letters = LANGS['ru'].letters
let CAPS = LANGS['ru'].caps

let alphabet = letters//.filter(elem => !exclude.includes(elem))

const randomIndex = (arr) => Math.floor(Math.random() * arr.length)

const generateWord = (len, letters) => Array( len )
  .fill(" ")
  .map( () => letters[ randomIndex(letters) ] )
  .join("")

const generatePhraseArray = (n, lang) =>
  Array( n ).fill( 1 )
    .map( () => Math.ceil(Math.random() * Math.random() * 10) + 1 )
    .map( (len) => generateWord( len, letters ) )

const generatePhrase = (n, lang) => generatePhraseArray(n, lang).join(" ")

const generatePhraseAndInject = (str) => (n, lang) => {
  let arr = generatePhraseArray(n, lang)
  let index = randomIndex(arr)
  arr.splice(index, 0, str)
  return arr.join(" ")
}

const translatePhrase = (phrase, lang) => translate(phrase, {from: 'lb', to: lang || 'ru'})

const generatePromise = (phrases, lang) => Promise.all(phrases.map((phrase) => translatePhrase(phrase, lang)))
  .then(trans => trans.map( t => t.text ) )

const generate = (lang) => {
  lang = 'ru' || lang
  let phrases = Array(10).fill(null).map( () => generatePhrase(20) )
  return generatePromise(phrases, lang)
    .then(trans => trans.filter( t => LANGS[lang].caps.includes(t[0]) ) )
}

const generateCats = (lang) => {
  let phrases = Array(10).fill(null).map( () => generatePhraseAndInject('кошка мяу')(20, lang) )
  return generatePromise(phrases, lang)
    .then(trans => trans.filter( t => t.includes( LANGS[lang].cat ) ))
}

module.exports = { generate, generateCats, generatePhrase, translatePhrase }
