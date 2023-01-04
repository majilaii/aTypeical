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
exports.CalculateRawWPM = void 0;
require("../css/stats-page.css");
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const data_1 = __importDefault(require("./data"));
const APIService_1 = __importDefault(require("../APIService"));
const hooks_1 = require("../redux/hooks");
const authenticated_1 = __importDefault(require("../redux/actions/authenticated"));
function CalculateRawWPM(text, speed) {
    return Math.round(text.length / 5 / (speed / 1000 / 60));
}
exports.CalculateRawWPM = CalculateRawWPM;
function Stats() {
    const { isAuthenticated, typingMode, difficulty } = (0, hooks_1.useAppSelector)((state) => {
        return {
            isAuthenticated: state.authenticatedReducer.isAuthenticated,
            typingMode: state.typingModeReducer.typingMode,
            difficulty: state.difficultyReducer.difficulty
        };
    });
    const dispatch = (0, hooks_1.useAppDispatch)();
    const { text, speed, incorrect, wordAmount, } = (0, react_router_dom_1.useOutletContext)();
    (0, react_1.useEffect)(() => {
        if (localStorage.getItem('userData') !== null) {
            dispatch(authenticated_1.default.login());
        }
    }, []);
    (0, react_1.useEffect)(() => {
        if (isAuthenticated) {
            (async function update() {
                const user = {
                    date: Date.now(),
                    text: text.length,
                    speed: speed,
                    incorrect: incorrect,
                    wordAmount,
                    typingMode,
                    difficulty,
                };
                await APIService_1.default.update(user);
            })();
        }
    }, []);
    const linkTarget = {
        pathname: '/',
        key: Math.random(),
        state: {
            applied: true,
        },
    };
    const LoginTarget = {
        pathname: '/register',
        key: Math.random(),
        state: {
            applied: true,
        },
    };
    const adjustedWPM = Math.round((text.length - incorrect) / 5 / (speed / 1000 / 60));
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "statsContainer" },
            react_1.default.createElement("p", { className: "stats" },
                react_1.default.createElement("span", { className: "description" }, " Time: "),
                (speed / 1000).toFixed(2),
                react_1.default.createElement("br", null),
                react_1.default.createElement("span", { className: "otherTime" },
                    new Date(speed).toISOString().slice(11, 19),
                    " duration")),
            react_1.default.createElement("p", { className: "stats" },
                react_1.default.createElement("span", { className: "description" }, " Raw WPM: "),
                CalculateRawWPM(text, speed),
                react_1.default.createElement("br", null)),
            react_1.default.createElement("p", { className: "stats" },
                react_1.default.createElement("span", { className: "description" }, " WPM: "),
                Math.max(0, adjustedWPM)),
            react_1.default.createElement("p", { className: "stats" },
                react_1.default.createElement("span", { className: "description" }, " Accuracy: "),
                ((100 * (text.length - incorrect)) / text.length).toFixed(2),
                "%")),
        react_1.default.createElement(data_1.default, null),
        react_1.default.createElement(react_router_dom_1.Link, { to: linkTarget, reloadDocument: true, className: "linkReset" },
            react_1.default.createElement("img", { alt: "reload", className: "icon", src: "https://htmlacademy.ru/assets/icons/reload-6x-white.png" })),
        !isAuthenticated && (react_1.default.createElement("p", { className: "loginMessage" },
            ' ',
            react_1.default.createElement(react_router_dom_1.Link, { to: LoginTarget, className: "linkLogin" }, "log in"),
            ' ',
            "to save results",
            ' '))));
}
exports.default = Stats;
