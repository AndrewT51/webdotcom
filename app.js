require('dotenv').config();
require('./db');

const fs = require('fs');
const path = require('path');
const { PORT } = process.env;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');

// set up morgan using examples from npm page. Sets up logging file in append mode
const logger = require('morgan');
const logDirectory = path.join(__dirname, 'logs')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a'});

// Middleware
app.use(bodyParser.json());
app.use(logger('combined', { stream: accessLogStream }));

// Routes
app.use(routes);

app.get('*', (req, res, next) => {
  const err = new Error('Route not found');
  err.status = 404;
  next(err);
});

// handling 404 errors
app.use((err, req, res, next) => {
  if(err.status !== 404) {
    return res.status(500).send(err.message);
  }
  res.status(404).send(err.message);
});


// begin listening for requests
app.listen(PORT, () => console.log(`Started on port ${ PORT }`));

module.exports = app