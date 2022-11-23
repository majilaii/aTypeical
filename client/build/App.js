"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.css");
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const nav_bar_1 = __importDefault(require("./components/nav-bar"));
// TODO refactor to Redux (if have time)
function App() {
    // TODO replace 0-1 with booleans
    const [wordAmount, setWordAmount] = (0, react_1.useState)(localStorage.getItem('wordAmount') !== null ? JSON.parse(localStorage.getItem('wordAmount')) : 15);
    const [speed, setSpeed] = (0, react_1.useState)(0);
    const [text, setText] = (0, react_1.useState)([]);
    const [incorrect, setIncorrect] = (0, react_1.useState)(0);
    const [KEnglish, setKEnglish] = (0, react_1.useState)(1);
    const [typingMode, setTypingMode] = (0, react_1.useState)(localStorage.getItem('typingMode') !== null ? JSON.parse(localStorage.getItem('typingMode')) : false);
    const [author, setAuthor] = (0, react_1.useState)(null);
    const [reset, setReset] = (0, react_1.useState)(true);
    const [prevInputLength, setPrevInputLength] = (0, react_1.useState)([]);
    const [adjustedWPM, setAdjustedWPM] = (0, react_1.useState)([]);
    const [gameState, setGameState] = (0, react_1.useState)(null);
    return (react_1.default.createElement("div", { className: 'wholeContainer' },
        react_1.default.createElement(nav_bar_1.default, null),
        react_1.default.createElement(react_router_dom_1.Outlet, { context: {
                gameState,
                setGameState,
                wordAmount,
                setWordAmount,
                speed,
                setSpeed,
                text,
                setText,
                incorrect,
                setIncorrect,
                KEnglish,
                setKEnglish,
                typingMode,
                setTypingMode,
                author,
                setAuthor,
                reset,
                setReset,
                prevInputLength,
                setPrevInputLength,
                adjustedWPM,
                setAdjustedWPM,
            } })));
}
exports.default = App;
