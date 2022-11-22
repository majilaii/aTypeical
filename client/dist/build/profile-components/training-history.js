"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var luxon_1 = require("luxon");
var react_1 = __importDefault(require("react"));
function Session(_a) {
    var element = _a.element;
    function whatMode(typing, english) {
        if (typing === false)
            return 'Word';
        if (typing === true)
            return 'Quotes';
        if (english === 1)
            return '1K';
        if (english === 5)
            return '5K';
        if (english === 10)
            return '10K';
    }
    return (react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement("tr", { className: 'session' }, react_1.default.createElement("td", null, element.wpm), react_1.default.createElement("td", null, element.rawwpm), react_1.default.createElement("td", null, element.accuracy.toFixed(1)), react_1.default.createElement("td", null, element.textLength, "/", element.incorrect), react_1.default.createElement("td", null, whatMode(element.typingMode, element.KEnglish), "/", element.wordAmount, "/", whatMode(null, element.KEnglish)), react_1.default.createElement("td", null, luxon_1.DateTime.fromISO(element.date).toLocaleString(luxon_1.DateTime.DATE_MED), react_1.default.createElement("br", null), luxon_1.DateTime.fromISO(element.date).toLocaleString(luxon_1.DateTime.TIME_24_WITH_SECONDS)))));
}
exports.default = Session;
