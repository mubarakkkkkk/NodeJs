const http = require('http');
const fs = require('fs');
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = require('./logEvents');
const EventEmitter = require('events');
const { promises } = require('dns');
class Emitter extends EventEmitter {};

// Initialize object
const myEmitter = new Emitter();

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
    console.log(req.url, req.method)

    let path;

    if(req.url === '/' || req.url === 'index.html'){
        res.statusCode = 200;
        res.setHeader('contentType', 'text.html');
        path = path.join(__dirname, 'views', 'index.html');
        fs.readFile(path, 'utf8', (err, data) => {
            res.end(data);
        });
    };
});

server.listen(PORT, () => console.log(`server is running on port ${PORT}`))






// myEmitter.on('log', (msg) => logEvents(msg));

//     myEmitter.emit('log', 'Log events has been emitted!');
