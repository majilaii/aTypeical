var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import '../css/choiceBar.css';
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import APIservice from '../APIService/index';
export default function Bar(_a) {
    var setCheckInput = _a.setCheckInput;
    var _b = useOutletContext(), wordAmount = _b.wordAmount, setWordAmount = _b.setWordAmount, KEnglish = _b.KEnglish, setKEnglish = _b.setKEnglish, typingMode = _b.typingMode, setTypingMode = _b.setTypingMode, setText = _b.setText, setAuthor = _b.setAuthor, setReset = _b.setReset;
    useEffect(function () {
        if (wordAmount > 5) {
            localStorage.setItem('wordAmount', JSON.stringify(wordAmount));
            localStorage.setItem('typingMode', JSON.stringify(typingMode));
            localStorage.setItem('KEnglish', JSON.stringify(KEnglish));
        }
    }, [KEnglish, typingMode, wordAmount]);
    useEffect(function () {
        if (localStorage.getItem('typingMode') !== null) {
            setWordAmount(JSON.parse(localStorage.getItem('wordAmount')));
            setKEnglish(JSON.parse(localStorage.getItem('KEnglish')));
            setTypingMode(JSON.parse(localStorage.getItem('typingMode')));
        }
    });
    useEffect(function () {
        wordOrQuote(localStorage.getItem('wordAmount') !== null ? JSON.parse(localStorage.getItem('wordAmount')) : 15, typingMode);
    }, [typingMode, KEnglish]);
    function getQuotes(length) {
        return __awaiter(this, void 0, void 0, function () {
            var data, quote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, APIservice.FetchQuotes(length)];
                    case 1:
                        data = _a.sent();
                        quote = data.content.split('');
                        quote = quote.map(function (letter) {
                            return { letter: letter, correct: 'neutral', active: 'false' };
                        });
                        setText(quote);
                        setAuthor(data.author);
                        return [2 /*return*/];
                }
            });
        });
    }
    function getWords(num) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, APIservice.fetchEnglishK(KEnglish, num)];
                    case 1:
                        data = _a.sent();
                        setText(data);
                        return [2 /*return*/];
                }
            });
        });
    }
    function wordOrQuote(chars, quote) {
        if (quote === void 0) { quote = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log({ quote: quote, typingMode: typingMode });
                if (quote) {
                    getQuotes(chars);
                }
                else {
                    setWordAmount(chars);
                    getWords(chars);
                }
                setCheckInput(0);
                setReset(function (num) { return (num = num + 1); });
                return [2 /*return*/];
            });
        });
    }
    return (React.createElement("div", { className: "choiceBar" },
        React.createElement("button", { onClick: function () { return setTypingMode(false); } }, " WORDS "),
        React.createElement("button", { onClick: function () { return setTypingMode(true); } }, " QUOTE "),
        React.createElement("div", { className: "spacer" }),
        React.createElement("button", { onClick: function () { return typingMode ? wordOrQuote(250, true) : wordOrQuote(100); } }, " THICC "),
        React.createElement("button", { onClick: function () { return typingMode ? wordOrQuote(150, true) : wordOrQuote(50); } }, " LONG "),
        React.createElement("button", { onClick: function () { return typingMode ? wordOrQuote(30, true) : wordOrQuote(20); } }, " SHORT "),
        typingMode === 0 && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "spacer" }),
            React.createElement("div", { className: "fadeIn" },
                React.createElement("button", { onClick: function () { return setKEnglish(10); } }, " HARD "),
                React.createElement("button", { onClick: function () { return setKEnglish(5); } }, " MEDIUM "),
                React.createElement("button", { onClick: function () { return setKEnglish(1); } }, " EASY "))))));
}
