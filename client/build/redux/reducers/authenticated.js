"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initialState = {
    isAuthenticated: false,
};
const authenticatedReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};
exports.default = authenticatedReducer;
