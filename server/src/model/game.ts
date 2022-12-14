'use strict';

import mongoose from './index.js';

const Schema = mongoose.Schema;

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

export default Game;
