"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule)
        return mod;
    var result = {};
    if (mod != null)
        for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.css");
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var nav_bar_1 = __importDefault(require("./components/nav-bar"));
// TODO refactor to Redux (if have time)
function App() {
    // TODO replace 0-1 with booleans
    var _a = (0, react_1.useState)(localStorage.getItem('wordAmount') !== null ? JSON.parse(localStorage.getItem('wordAmount')) : 15), wordAmount = _a[0], setWordAmount = _a[1];
    var _b = (0, react_1.useState)(0), speed = _b[0], setSpeed = _b[1];
    var _c = (0, react_1.useState)([]), text = _c[0], setText = _c[1];
    var _d = (0, react_1.useState)(0), incorrect = _d[0], setIncorrect = _d[1];
    var _e = (0, react_1.useState)(1), KEnglish = _e[0], setKEnglish = _e[1];
    var _f = (0, react_1.useState)(localStorage.getItem('typingMode') !== null ? JSON.parse(localStorage.getItem('typingMode')) : false), typingMode = _f[0], setTypingMode = _f[1];
    var _g = (0, react_1.useState)(null), author = _g[0], setAuthor = _g[1];
    var _h = (0, react_1.useState)(true), reset = _h[0], setReset = _h[1];
    var _j = (0, react_1.useState)([]), prevInputLength = _j[0], setPrevInputLength = _j[1];
    var _k = (0, react_1.useState)([]), adjustedWPM = _k[0], setAdjustedWPM = _k[1];
    var _l = (0, react_1.useState)(false), isAuthenticated = _l[0], setIsAuthenticated = _l[1];
    var _m = (0, react_1.useState)(null), gameState = _m[0], setGameState = _m[1];
    return (react_1.default.createElement("div", { className: 'wholeContainer' }, react_1.default.createElement(nav_bar_1.default, { isAuthenticated: isAuthenticated, setIsAuthenticated: setIsAuthenticated }), react_1.default.createElement(react_router_dom_1.Outlet, { context: {
            gameState: gameState,
            setGameState: setGameState,
            wordAmount: wordAmount,
            setWordAmount: setWordAmount,
            speed: speed,
            setSpeed: setSpeed,
            text: text,
            setText: setText,
            incorrect: incorrect,
            setIncorrect: setIncorrect,
            KEnglish: KEnglish,
            setKEnglish: setKEnglish,
            typingMode: typingMode,
            setTypingMode: setTypingMode,
            author: author,
            setAuthor: setAuthor,
            reset: reset,
            setReset: setReset,
            prevInputLength: prevInputLength,
            setPrevInputLength: setPrevInputLength,
            adjustedWPM: adjustedWPM,
            setAdjustedWPM: setAdjustedWPM,
            isAuthenticated: isAuthenticated,
            setIsAuthenticated: setIsAuthenticated,
        } })));
}
exports.default = App;
