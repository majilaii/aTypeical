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
var react_1 = __importStar(require("react"));
var socketConfig_1 = __importDefault(require("./socketConfig"));
function StartButton(_a) {
    var player = _a.player, isHost = _a.isHost, gameState = _a.gameState;
    var _b = (0, react_1.useState)(false), startCount = _b[0], setStartCount = _b[1];
    function startGame() {
        setStartCount(true);
        socketConfig_1.default.emit('gameStart', { playerID: player._id, gameID: gameState._id });
    }
    return (react_1.default.createElement(react_1.default.Fragment, null, isHost && startCount === false && (react_1.default.createElement("button", { className: 'resetButton', onClick: startGame }, ' ', "START", ' '))));
}
exports.default = StartButton;
