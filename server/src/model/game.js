"use strict";
require("dotenv").config();

const mongoose = require("./index.js");

const Schema = mongoose.Schema;

const playerSchema = new Schema ({
    index:{
        type: Number,
        default: 0
    },
    nickname:{
        type:String
    },
    PartyLeader:{
        type:Boolean
    },
    WPM: {
        type: Number,
        default: 0
    },
    socketID: {
        type: String,
    }



})

const gameSchema = new Schema({
    words: [{
        type: String
    }],
    roomOpen:{
        type: Boolean,
        default:true
    },
    roomClosed: {
        type: Boolean,
        default: false
    },
    players:[
        playerSchema
    ],
    Timer: {
        type:Number
    }


 })


const Game = mongoose.model("Games", gameSchema );

module.exports = Game;
