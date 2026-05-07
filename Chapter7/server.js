const express = require('express');
const app = express();
const path = require('path');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')
const { request } = require('http');
const PORT = process.env.PORT || 3500;

app.use(logger);

const whitelist = ['https://www.google.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
const corsOption = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 ){
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionSuccessStatus: 200
}

app.use(cors(corsOption));

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    //res.sendFile('./views/index.html', {root: __dirname});
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page.html', (req, res) => {   
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page.html', (req, res) => {
    res.redirect(301, 'new-page.html')
});

//Route Handlers

app.get('/hello.html', (req, res, next) => {
    console.log('Attemted to load hello.html');
    next();
}, (req, res) => {
    res.send('Hello World!');
});

// chaining route handlers
const one = (req, res, next) => {
    console.log('one');
    next();
};

const two = (req, res, next) => {
    console.log('two');
    next();
};

const three = (req, res) => {
    console.log('Three');
    res.send('Finished');
};

app.get('/chain.html', [one, two, three]);

app.get('/{*path}', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));