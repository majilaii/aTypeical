'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = __importDefault(require("./index.js"));
const Schema = index_js_1.default.Schema;
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
const Game = index_js_1.default.model('Games', gameSchema);
exports.default = Game;
