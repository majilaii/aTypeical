'use strict';
require('dotenv').config();

const mongoose = require('./index.js');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  history:[{
    date: {
        type:Date,
        default: Date.now()
    },
    wpm: {
        type:Number,
   
    },
    accuracy: {
        type:Number,
    },
    rawwpm: {
        type:Number,
    },
    time: {
        type:Number,
    },
    textLength:{
        type:Number
    },
    incorrect: {
        type:Number
    }
  }]
});

const User = mongoose.model('Users', userSchema);

module.exports = User;