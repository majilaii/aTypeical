"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initialState = {
    game: ,
};
const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case '':
            return {
                ...state,
                game: ,
            };
        default:
            return state;
    }
};
exports.default = gameReducer;
