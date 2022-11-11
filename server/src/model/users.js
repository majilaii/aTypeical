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
        type:Date
    },
    wpm: {
        type:String,
   
    },
    accuracy: {
        type:String,
    },
    rawwpm: {
        type:String,
    },
    time: {
        type:String,
    },
    length:{
        type:String
    },
    incorrects: {
        type:String
    }
  }]
});

const User = mongoose.model('Users', userSchema);

module.exports = User;