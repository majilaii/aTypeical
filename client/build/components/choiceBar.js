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
require("../css/choiceBar.css");
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const index_1 = __importDefault(require("../APIService/index"));
function Bar({ setCheckInput }) {
    const { wordAmount, setWordAmount, KEnglish, setKEnglish, typingMode, setTypingMode, setText, setAuthor, setReset, } = (0, react_router_dom_1.useOutletContext)();
    (0, react_1.useEffect)(() => {
        if (wordAmount > 5) {
            localStorage.setItem('wordAmount', JSON.stringify(wordAmount));
            localStorage.setItem('typingMode', JSON.stringify(typingMode));
            localStorage.setItem('KEnglish', JSON.stringify(KEnglish));
        }
    }, [KEnglish, typingMode, wordAmount]);
    (0, react_1.useEffect)(() => {
        if (localStorage.getItem('typingMode') !== null) {
            setWordAmount(JSON.parse(localStorage.getItem('wordAmount')));
            setKEnglish(JSON.parse(localStorage.getItem('KEnglish')));
            setTypingMode(JSON.parse(localStorage.getItem('typingMode')));
        }
    });
    (0, react_1.useEffect)(() => {
        wordOrQuote(localStorage.getItem('wordAmount') !== null ? JSON.parse(localStorage.getItem('wordAmount')) : 15, typingMode);
    }, [typingMode, KEnglish]);
    async function getQuotes(length) {
        const data = await index_1.default.FetchQuotes(length);
        let quote = data.content.split('');
        quote = quote.map((letter) => {
            return { letter: letter, correct: 'neutral', active: 'false' };
        });
        setText(quote);
        setAuthor(data.author);
    }
    async function getWords(num) {
        const data = await index_1.default.fetchEnglishK(KEnglish, num);
        setText(data);
    }
    async function wordOrQuote(chars, quote = false) {
        console.log({ quote, typingMode });
        if (quote) {
            getQuotes(chars);
        }
        else {
            setWordAmount(chars);
            getWords(chars);
        }
        setCheckInput(0);
        setReset((num) => (num = num + 1));
    }
    return (react_1.default.createElement("div", { className: "choiceBar" },
        react_1.default.createElement("button", { onClick: () => setTypingMode(false) }, " WORDS "),
        react_1.default.createElement("button", { onClick: () => setTypingMode(true) }, " QUOTE "),
        react_1.default.createElement("div", { className: "spacer" }),
        react_1.default.createElement("button", { onClick: () => typingMode ? wordOrQuote(250, true) : wordOrQuote(100) }, " THICC "),
        react_1.default.createElement("button", { onClick: () => typingMode ? wordOrQuote(150, true) : wordOrQuote(50) }, " LONG "),
        react_1.default.createElement("button", { onClick: () => typingMode ? wordOrQuote(30, true) : wordOrQuote(20) }, " SHORT "),
        !typingMode && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "spacer" }),
            react_1.default.createElement("div", { className: "fadeIn" },
                react_1.default.createElement("button", { onClick: () => setKEnglish(10) }, " HARD "),
                react_1.default.createElement("button", { onClick: () => setKEnglish(5) }, " MEDIUM "),
                react_1.default.createElement("button", { onClick: () => setKEnglish(1) }, " EASY "))))));
}
exports.default = Bar;
