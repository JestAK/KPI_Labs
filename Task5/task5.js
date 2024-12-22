'use strict'

const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('request', (req) => {
    console.log("Got request");
    console.log(`Request data: ${JSON.stringify(req)}`);
});

emitter.on('error', () => {
    console.log("Here is an error :(");
    emitter.emit('end')
});

emitter.on('end', () => {
   console.log("Program ended");
   process.exit(0);
});

emitter.emit('request', {data: {
        name: "Anton",
        lastName: "Kaliberda",
        status: "logged",
    }
});

emitter.emit('error');