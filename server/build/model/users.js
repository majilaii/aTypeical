'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = __importDefault(require("./index.js"));
const Schema = index_js_1.default.Schema;
const userSchema = new Schema({
    created: {
        type: Date,
        default: Date.now(),
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    history: [
        {
            date: {
                type: Date,
            },
            wpm: {
                type: Number,
            },
            accuracy: {
                type: Number,
            },
            rawwpm: {
                type: Number,
            },
            time: {
                type: Number,
            },
            textLength: {
                type: Number,
            },
            incorrect: {
                type: Number,
            },
            wordAmount: {
                type: Number,
            },
            KEnglish: {
                type: Number,
            },
            typingMode: {
                type: Boolean,
            },
        },
    ],
});
const User = index_js_1.default.model('Users', userSchema);
exports.default = User;
