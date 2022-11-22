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
import '../css/stats-page.css';
import React, { useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import Data from './data';
import APIservice from '../APIService';
export function CalculateRawWPM(text, speed) {
    return Math.round(text.length / 5 / (speed / 1000 / 60));
}
export default function Stats() {
    var _a = useOutletContext(), text = _a.text, speed = _a.speed, incorrect = _a.incorrect, setIsAuthenticated = _a.setIsAuthenticated, isAuthenticated = _a.isAuthenticated, KEnglish = _a.KEnglish, wordAmount = _a.wordAmount, typingMode = _a.typingMode;
    useEffect(function () {
        if (localStorage.getItem('userData') !== null) {
            setIsAuthenticated(true);
        }
    }, []);
    useEffect(function () {
        if (isAuthenticated) {
            (function update() {
                return __awaiter(this, void 0, void 0, function () {
                    var user;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                user = {
                                    date: Date.now(),
                                    text: text.length,
                                    speed: speed,
                                    incorrect: incorrect,
                                    wordAmount: wordAmount,
                                    typingMode: typingMode,
                                    KEnglish: KEnglish,
                                };
                                return [4 /*yield*/, APIservice.update(user)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            })();
        }
    }, []);
    var linkTarget = {
        pathname: '/',
        key: Math.random(),
        state: {
            applied: true,
        },
    };
    var LoginTarget = {
        pathname: '/register',
        key: Math.random(),
        state: {
            applied: true,
        },
    };
    var adjustedWPM = Math.round((text.length - incorrect) / 5 / (speed / 1000 / 60));
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "statsContainer" },
            React.createElement("p", { className: "stats" },
                React.createElement("span", { className: "description" }, " Time: "),
                (speed / 1000).toFixed(2),
                React.createElement("br", null),
                React.createElement("span", { className: "otherTime" },
                    new Date(speed).toISOString().slice(11, 19),
                    " duration")),
            React.createElement("p", { className: "stats" },
                React.createElement("span", { className: "description" }, " Raw WPM: "),
                CalculateRawWPM(text, speed),
                React.createElement("br", null)),
            React.createElement("p", { className: "stats" },
                React.createElement("span", { className: "description" }, " WPM: "),
                Math.max(0, adjustedWPM)),
            React.createElement("p", { className: "stats" },
                React.createElement("span", { className: "description" }, " Accuracy: "),
                ((100 * (text.length - incorrect)) / text.length).toFixed(2),
                "%")),
        React.createElement(Data, null),
        React.createElement(Link, { to: linkTarget, reloadDocument: true, className: "linkReset" },
            React.createElement("img", { alt: "reload", className: "icon", src: "https://htmlacademy.ru/assets/icons/reload-6x-white.png" })),
        !isAuthenticated && (React.createElement("p", { className: "loginMessage" },
            ' ',
            React.createElement(Link, { to: LoginTarget, className: "linkLogin" }, "log in"),
            ' ',
            "to save results",
            ' '))));
}
