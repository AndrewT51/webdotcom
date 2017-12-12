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

app.listen(PORT, () => console.log(`Started on port ${ PORT }`));
