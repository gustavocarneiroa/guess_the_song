import { music } from "./music.js";

const musicLetter = music.trim();

musicLetter.split('\n').forEach( (sentence, index) => {
    if(['', '\n'].includes(sentence.trim())) return;

    const sentenceElement = createSentenceElement(index)
    sentence.split(' ').filter( m => m.trim()).forEach( word => {
        createWordElement(word, sentenceElement)
    })   
})

const repeatedWords = musicLetter.split('\n').join(' ').split(' ').map(w => sanitizeWord(w));
let words = [...new Set(musicLetter.split('\n').join(' ').split(' '))].map(w => sanitizeWord(w)).filter(w => w);
document.getElementById('inputText').addEventListener('input', handleKeyUp)
document.getElementById('total').innerText = words.length;


function createWordElement(word, sentence) {
    const tile = document.createElement('span');
    tile.className = "word"
    tile.setAttribute("data-response", sanitizeWord(word))
    tile.setAttribute("data-original", word)
    tile.innerText = word.split('').map( w => '_ ').join('');
    sentence.append(tile)
}

function createSentenceElement(index) {
    const sentence = document.createElement('div');
    sentence.setAttribute("data-sentence", String(index + 1).padStart(3, '0'))
    document.getElementById('guess').append(sentence)
    return sentence
}

function createEventElement(word) {
    const span = document.createElement('span');
    span.innerHTML = `New word found: <strong>${word}</strong>. It appears ${occurrencesOf(word)} time(s).`
    document.getElementById('listener').prepend(span)
}

function occurrencesOf(word) {
    return repeatedWords.filter(w => w === word).length
}

function sanitizeWord(word) {
    return word.replace(/[^a-zA-Z]+/g, '').toLowerCase();
}

function responseFound(response) {
    const responses = document.querySelectorAll(`[data-response="${response}"]`);
    [...responses].forEach( res => {
        res.innerHTML = res.getAttribute("data-original")
    })
}

function incrementCounter() {
    const counter = document.getElementById('counter');
    counter.innerHTML = Number(counter.innerHTML ) + 1;
}

function handleKeyUp(event) {
    const word = sanitizeWord(event.srcElement.value);
    if(words.includes(word)) {
        words = words.filter( w => w !== word )
        responseFound(word)
        createEventElement(word)
        incrementCounter()
        event.srcElement.value = ''
    }

    if(!words.length) {
        setTimeout(() => alert('YOU WIN'), 1000);
    }
}

