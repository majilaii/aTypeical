"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login = () => {
    return {
        type: 'LOGIN',
    };
};
const logout = () => {
    return {
        type: 'LOGOUT',
    };
};
const authenticated = { login, logout };
exports.default = authenticated;
