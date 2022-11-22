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
require("./css/countDown.css");
const socketConfig_1 = __importDefault(require("./socketConfig"));
const react_1 = __importStar(require("react"));
function CountDown({ setGameStart }) {
    //  TODO context or Redux
    const [countDown, setCountdown] = (0, react_1.useState)({ time: '', message: '' });
    socketConfig_1.default.on('timer', (data) => {
        setCountdown(data);
        console.log(data.time);
    });
    (0, react_1.useEffect)(() => {
        if (typeof countDown.time === 'number' && countDown.time === 0) {
            setGameStart(true);
        }
    });
    return (react_1.default.createElement(react_1.default.Fragment, null, typeof countDown.time === 'number' && countDown.time !== 0 && (react_1.default.createElement("div", { className: 'countdownMessage' },
        countDown.message,
        countDown.time))));
}
exports.default = CountDown;
