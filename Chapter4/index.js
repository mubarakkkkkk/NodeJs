const logEvents = require('./logEvents');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

// Initialize object

const myEmitter = new MyEmitter();

// Add listener for the log event

myEmitter.on('log', (msg) => logEvents(msg));

setTimeout( () => {
    myEmitter.emit('log', 'Log events has been emitted!');
}, 2000)