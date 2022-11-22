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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import '../css/main-page.css';
import React, { useEffect, useState, useRef } from 'react';
import { useOutletContext, useNavigate, Link } from 'react-router-dom';
import APIservice from '../APIService/index.js';
import Bar from './choiceBar.js';
export default function Main() {
    var navigate = useNavigate();
    var linkTarget = {
        pathname: '/',
        key: Math.random(),
        state: {
            applied: true,
        },
    };
    var _a = useOutletContext(), setWordAmount = _a.setWordAmount, setIncorrect = _a.setIncorrect, setSpeed = _a.setSpeed, typingMode = _a.typingMode, text = _a.text, setText = _a.setText, author = _a.author, reset = _a.reset, setPrevInputLength = _a.setPrevInputLength, setIsAuthenticated = _a.setIsAuthenticated;
    // TODO potentially move to context (or to Redux, if we use)
    var _b = useState(false), checkFirstInput = _b[0], setCheckInput = _b[1];
    var _c = useState(true), loading = _c[0], setLoading = _c[1];
    var inputRef = useRef(null);
    var interval;
    useEffect(function () {
        function isLoggedIn() {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, APIservice.profile()];
                        case 1:
                            res = _a.sent();
                            if (!res) {
                                // TODO check where else we're using local storage
                                localStorage.removeItem('userData');
                                setIsAuthenticated(false);
                            }
                            else
                                setIsAuthenticated(true);
                            return [2 /*return*/];
                    }
                });
            });
        }
        isLoggedIn();
    });
    useEffect(function () {
        if (checkFirstInput !== false) {
            // TODO replace setInterval function
            interval = setInterval(function () {
                try {
                    if (inputRef.current.value.length) {
                        setPrevInputLength(function (arr) { return __spreadArray(__spreadArray([], arr, true), [
                            inputRef.current.value.length,
                        ], false); });
                    }
                }
                catch (err) {
                    clearInterval(interval);
                }
            }, 1000);
        }
    }, [checkFirstInput]);
    useEffect(function () {
        // TODO double-check that this only adds one event listener
        window.addEventListener('keydown', focus);
        inputRef.current.value = '';
        setCheckInput(false);
        setLoading(false);
    }, [reset]);
    var preventCopyPaste = function (e) {
        e.preventDefault();
    };
    // TODO more descriptive name?
    function focus() {
        inputRef.current.focus();
    }
    // TODO probably don't need this function inside the function this time
    function changeWordAmount(num) {
        setWordAmount(num);
    }
    // TODO move into a separate file (separate into smaller functions)
    function textValidate(e) {
        var value = e.target.value;
        if (checkFirstInput === false) {
            setCheckInput(true);
            setSpeed(Date.now());
        }
        for (var i = 0; i < value.length; i++) {
            var current = text[i];
            if (current.letter === value[i]) {
                current.correct = 'correct';
            }
            else {
                current.correct = 'incorrect';
            }
        }
        if (text[value.length + 1]) {
            text[value.length].correct = 'neutral';
            text[value.length].active = 'false';
        }
        // TODO remove for-loop and use length instead
        for (var i = 0; i < value.length; i++) {
            if (text[i + 1] && text[i + 1].correct === 'neutral') {
                text[i].active = 'true';
                break;
            }
            var current = text[i];
            current.active = 'false';
        }
        setText(__spreadArray([], text, true));
        if (value.length === text.length) {
            var currentTime_1 = new Date();
            // TODO try moving the line below to the reset function
            setIncorrect(false);
            for (var _i = 0, text_1 = text; _i < text_1.length; _i++) {
                var obj = text_1[_i];
                for (var key in obj) {
                    if (obj[key] === 'incorrect') {
                        setIncorrect(function (incorrect) { return (incorrect += 1); });
                    }
                }
            }
            setSpeed(function (time) { return currentTime_1 - time; });
            setPrevInputLength(function (arr) { return __spreadArray(__spreadArray([], arr, true), [value.length], false); });
            clearInterval(interval);
            navigate('/stats');
        }
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "Main-container" },
            React.createElement(Bar, { setCheckInput: setCheckInput }),
            React.createElement("div", { className: "typing-container", id: "typingContainer" },
                React.createElement("p", { onCopy: function (e) { return preventCopyPaste(e); }, onPaste: function (e) { return preventCopyPaste(e); }, onCut: function (e) { return preventCopyPaste(e); }, id: "textArea" }, text.map(function (el, i) {
                    return (React.createElement("span", { className: "".concat(el.correct === 'neutral'
                            ? 'neutral'
                            : el.correct === 'correct'
                                ? 'correct'
                                : 'incorrect', " ").concat(el.active === 'true' ? 'active' : ''), key: i, id: i }, el.letter));
                })),
                typingMode === true && React.createElement("span", { className: "author" },
                    "- ",
                    author)),
            React.createElement("div", { className: "inputDiv" },
                React.createElement("input", { ref: inputRef, id: "mainPageInput", type: "text", className: "inputBar", onChange: textValidate }),
                React.createElement(Link, { to: linkTarget, reloadDocument: true, className: "linkReset" },
                    React.createElement("button", { className: "resetButton" }, "Reset"))))));
}
