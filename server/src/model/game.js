'use strict';
// TODO we shouldn't need dotenv here, as we're using it in the main index.js already
require('dotenv').config();

const mongoose = require('./index.js');

const Schema = mongoose.Schema;

// TODO do we need to add some required/default, etc.?
const playerSchema = new Schema({
  index: {
    type: Number,
    default: 0,
  },
  nickname: {
    type: String,
  },
  PartyLeader: {
    type: Boolean,
  },
  WPM: {
    type: Number,
    default: 0,
  },
  socketID: {
    type: String,
  },
});

const gameSchema = new Schema({
  words: [
    {
      type: String,
    },
  ],
  roomOpen: {
    type: Boolean,
    default: true,
  },
  gameOver: {
    type: Boolean,
    default: false,
  },
  players: [playerSchema],
  startTime: {
    type: Number,
  },
});

const Game = mongoose.model('Games', gameSchema);

module.exports = { Game };
