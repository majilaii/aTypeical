"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initialState = {
    typingMode: 'WORDS' // localStorage.getItem('typingMode') !== 'null' ? JSON.parse(localStorage.getItem('typingMode')) : 'QUOTES',
};
const typingModeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'WORDS':
            return {
                ...state,
                typingMode: 'WORDS',
            };
        case 'QUOTES':
            return {
                ...state,
                typingMode: 'QUOTES',
            };
        case 'SET-TYPING-MODE':
            return {
                ...state,
                typingMode: action.payload,
            };
        default:
            return state;
    }
};
exports.default = typingModeReducer;
