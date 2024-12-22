'use strict'

const { Readable} = require('stream');
const fs = require('fs')


const randomNumberStream = new Readable({
    read(size){
        const randomNumber = Math.floor(Math.random() * 100);
        this.push(randomNumber.toString());
        this.push("\n");
    }
});

const writableStream = fs.createWriteStream('file.txt')

randomNumberStream.pipe(writableStream)

setTimeout(() => {
    randomNumberStream.push(null)
}, 2000)

writableStream.on('finish', () => {
    console.log('File writing completed.');
});

randomNumberStream.on('end', () => {
    console.log('Random number stream ended.');
});

randomNumberStream.on('error', (err) => {
    console.error('Stream error:', err.message);
});

writableStream.on('error', (err) => {
    console.error('File write error:', err.message);
});