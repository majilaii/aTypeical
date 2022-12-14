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
require("./css/gameTimer.css");
const react_1 = __importStar(require("react"));
const socketConfig_1 = __importDefault(require("./socketConfig"));
//  TODO implement context (or Redux)
function GameTimer({ gameOver, player }) {
    const [gameTimer, setGameTimer] = (0, react_1.useState)({ timer: '', message: '' });
    const [WPM, setWPM] = (0, react_1.useState)('');
    socketConfig_1.default.on('gameTimer', (data) => {
        setGameTimer(data);
        console.log(data.timer);
    });
    (0, react_1.useEffect)(() => {
        if (player) {
            setWPM(player.WPM);
        }
    }, [player]);
    return (react_1.default.createElement(react_1.default.Fragment, null, (typeof gameTimer.timer === 'number' && gameTimer.timer !== 0 || !gameOver) && (react_1.default.createElement("div", { className: 'gameTimerMessage' },
        gameTimer.timer,
        gameTimer.message))));
}
exports.default = GameTimer;
