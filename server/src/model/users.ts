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

export interface user extends mongoose.Document {
  created: Date;
  username: string;
  email: string;
  password: string;
  history: {
      date?: Date;
      wpm?: number;
      accuracy?: number;
      rawwpm?: number;
      time?: number;
        textLength?: number;
        incorrect?: number;
        wordAmount?: number;
        KEnglish?: number;
        typingMode?: number;
    }[];
}


const User = mongoose.model('Users', userSchema);

export default User;
