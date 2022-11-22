'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/';
const DATABASE_NAME = process.env.DATABASE_NAME || 'Users';
mongoose_1.default.connect(`${DATABASE_URL}${DATABASE_NAME}`);
exports.default = mongoose_1.default;
