'use strict';
// TODO we shouldn't need dotenv here, as we're using it in the main index.js already
require('dotenv').config();

const mongoose = require('mongoose');

// TODO add ors
const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;

mongoose.connect( `${DATABASE_URL}${DATABASE_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;