"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initialState = {
    difficulty: 'EASY',
};
const difficultyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'EASY':
            return {
                ...state,
                difficulty: 'EASY',
            };
        case 'MEDIUM':
            return {
                ...state,
                difficulty: 'MEDIUM',
            };
        case 'HARD':
            return {
                ...state,
                difficulty: 'HARD',
            };
        default:
            return state;
    }
};
exports.default = difficultyReducer;
