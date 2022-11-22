"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./css/Word.css");
var react_1 = __importDefault(require("react"));
function Word(_a) {
    var element = _a.element, listID = _a.listID, activeWordIndex = _a.activeWordIndex, wrong = _a.wrong;
    return (react_1.default.createElement("div", { className: "".concat(listID === activeWordIndex && wrong === true
            ? 'current word wrong '
            : listID === activeWordIndex
                ? 'current word '
                : 'word') }, element));
}
exports.default = Word;
