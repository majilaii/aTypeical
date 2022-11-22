'use strict';

import mongoose from './index.js';

const Schema = mongoose.Schema;

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

export default User;
