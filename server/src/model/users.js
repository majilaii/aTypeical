'use strict';
// TODO we shouldn't need dotenv here, as we're using it in the main index.js already
require('dotenv').config();

const mongoose = require('./index.js');

const Schema = mongoose.Schema;

// TODO do we need to add some required/default, etc.?
const userSchema = new Schema({
  created: {
    type: Date,
    default: Date.now(),
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  history: [
    {
      date: {
        type: Date,
      },
      wpm: {
        type: Number,
      },
      accuracy: {
        type: Number,
      },
      rawwpm: {
        type: Number,
      },
      time: {
        type: Number,
      },
      textLength: {
        type: Number,
      },
      incorrect: {
        type: Number,
      },
      wordAmount: {
        type: Number,
      },
      KEnglish: {
        type: Number,
      },
      typingMode: {
        type: Number,
      },
    },
  ],
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
