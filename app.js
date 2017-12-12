require('dotenv').config();
require('./db');
const { PORT } = process.env;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');

// Middleware
app.use(bodyParser.json());

// Routes
app.use(routes);

app.get('*', (req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = "Route not found"
  next(err);
});

// handling 404 errors
app.use((err, req, res, next) => {
  if(err.status !== 404) {
    return next();
  }
  res.send(err.message);
});

app.listen(PORT, () => console.log(`Started on port ${ PORT }`));
