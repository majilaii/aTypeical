"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const redux_1 = require("redux");
const authenticated_1 = __importDefault(require("./reducers/authenticated"));
const reducers = (0, redux_1.combineReducers)({ authenticatedReducer: authenticated_1.default });
exports.store = (0, redux_1.createStore)(reducers);
