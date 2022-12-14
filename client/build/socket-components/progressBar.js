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
const react_1 = __importStar(require("react"));
require("./css/progressBar.css");
const socketConfig_1 = __importDefault(require("./socketConfig"));
function ProgressBar({ gameState, text, setGameState }) {
    (0, react_1.useEffect)(() => {
        socketConfig_1.default.on('gameUpdate', (data) => {
            setGameState(data);
        });
        socketConfig_1.default.on('gameFinished', (data) => {
            setGameState(data);
        });
    });
    return (react_1.default.createElement("div", { className: 'progress' }, gameState.players.map((el) => {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("p", { className: 'playerName' },
                ' ',
                el.nickname,
                ' ',
                gameState.gameOver === true && el.WPM + 'WPM',
                ' '),
            react_1.default.createElement("div", { className: 'bodyProgress' },
                react_1.default.createElement("div", { className: 'currentProgress', style: {
                        width: `${100 * (el.index / text.length)}%`,
                        height: `30px`,
                    } }, ' '),
                el.index && (react_1.default.createElement("p", { className: 'playerName' },
                    (100 * (el.index / text.length)).toFixed(1),
                    "%")))));
    })));
}
exports.default = ProgressBar;
