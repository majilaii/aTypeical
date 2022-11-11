'use strict';
require('dotenv').config();
const mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;

mongoose.connect( `${DATABASE_URL}${DATABASE_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;