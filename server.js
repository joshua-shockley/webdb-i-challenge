const express = require('express');
const helmet = require('helmet');
// const db = require('./data/dbConfig.js');
const DbRouter = require('./DbRouter.js');
const server = express();


server.use(logger);
server.use(helmet());
server.use(express.json());

//when done switch to use the router version...
server.use('/api/accounts', DbRouter);


server.get('/', (req, res) => {
    res.send('<h2>This shows up its at least working</h2>');
});

//make a logger middleware
function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
    next();
};

module.exports = server;