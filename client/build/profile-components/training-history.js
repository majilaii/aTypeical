"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const react_1 = __importDefault(require("react"));
function Session({ element }) {
    function whatMode(typing, difficultyLevel) {
        if (typing === 'WORDS')
            return 'Word';
        if (typing === 'QUOTES')
            return 'Quotes';
        return difficultyLevel;
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("tr", { className: 'session' },
            react_1.default.createElement("td", null, element.wpm),
            react_1.default.createElement("td", null, element.rawwpm),
            react_1.default.createElement("td", null, element.accuracy.toFixed(1)),
            react_1.default.createElement("td", null,
                element.textLength,
                "/",
                element.incorrect),
            react_1.default.createElement("td", null,
                whatMode(element.typingMode, element.difficulty),
                "/",
                element.wordAmount,
                "/",
                whatMode(null, element.difficulty)),
            react_1.default.createElement("td", null,
                luxon_1.DateTime.fromISO(element.date).toLocaleString(luxon_1.DateTime.DATE_MED),
                react_1.default.createElement("br", null),
                luxon_1.DateTime.fromISO(element.date).toLocaleString(luxon_1.DateTime.TIME_24_WITH_SECONDS)))));
}
exports.default = Session;
