"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const words = () => {
    return {
        type: 'WORDS',
    };
};
const quotes = () => {
    return {
        type: 'QUOTES',
    };
};
const setTypingMode = (payload) => {
    return {
        type: 'SET-TYPING-MODE',
        payload
    };
};
const typing = { words, quotes, setTypingMode };
exports.default = typing;
