require('dotenv').config()
require('../models');
const { MONGO_URL } = process.env;
const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;

mongoose.connect(MONGO_URL, { useMongoClient: true })
.then( () => console.log(`Connected to database: ${MONGO_URL}`))
.catch( err => console.log(`Error connecting to database: ${err}`))