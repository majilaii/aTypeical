"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const easy = () => {
    return {
        type: 'EASY',
    };
};
const medium = () => {
    return {
        type: 'MEDIUM',
    };
};
const hard = () => {
    return {
        type: 'HARD',
    };
};
const setDifficulty = (payload) => {
    return {
        type: 'SET-DIFFICULTY',
        payload
    };
};
const difficultyActions = { easy, medium, hard, setDifficulty };
exports.default = difficultyActions;
