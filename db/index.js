require('dotenv').config();
require('../models');

const { MONGO_URL, TEST_MONGO_URL, NODE_ENV } = process.env;
const DB_URL = NODE_ENV === 'test' ? TEST_MONGO_URL : MONGO_URL;
const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;

mongoose.connect(DB_URL, { useMongoClient: true })
  .then(() => NODE_ENV !== 'test' && console.log(`Connected to database: ${DB_URL}`))
  .catch(err => console.log(`Error connecting to database: ${err}`));
