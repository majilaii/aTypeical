"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initialState = {
    reset: true,
};
const resetReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RESET-TOGGLE':
            return {
                ...state,
                reset: !state.reset,
            };
        default:
            return state;
    }
};
exports.default = resetReducer;
