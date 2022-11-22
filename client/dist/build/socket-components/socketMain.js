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
require("./css/socketMain.css");
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var StartButton_1 = __importDefault(require("./StartButton"));
var socketConfig_1 = __importDefault(require("./socketConfig"));
var Word_1 = __importDefault(require("./Word"));
var countDown_1 = __importDefault(require("./countDown"));
var gameTimer_1 = __importDefault(require("./gameTimer"));
var progressBar_1 = __importDefault(require("./progressBar"));
function SocketMain() {
    // TODO context (maybe new context just for socket), or Redux
    var _a = (0, react_router_dom_1.useOutletContext)(), gameState = _a.gameState, setGameState = _a.setGameState;
    var _b = (0, react_1.useState)(false), gameStart = _b[0], setGameStart = _b[1];
    var _c = (0, react_1.useState)(false), gameOver = _c[0], setGameOver = _c[1];
    var _d = (0, react_1.useState)([]), text = _d[0], setText = _d[1];
    var _e = (0, react_1.useState)(false), isHost = _e[0], setIsHost = _e[1];
    var _f = (0, react_1.useState)(''), userInput = _f[0], setUserInput = _f[1];
    var _g = (0, react_1.useState)(0), activeWordIndex = _g[0], setActiveWordIndex = _g[1];
    var _h = (0, react_1.useState)(false), wrong = _h[0], setWrong = _h[1];
    var _j = (0, react_1.useState)(null), player = _j[0], setPlayer = _j[1];
    var raceInputRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        socketConfig_1.default.on('gameFinished', function (data) {
            setGameState(data);
            setGameOver(true);
        });
    }, []);
    (0, react_1.useEffect)(function () {
        if (gameStart)
            focus();
    }, [gameStart]);
    (0, react_1.useEffect)(function () {
        window.addEventListener('keydown', focus);
    }, []);
    (0, react_1.useEffect)(function () {
        if (activeWordIndex > 0) {
            socketConfig_1.default.emit('indexIncrease', {
                textLength: gameState.words.length,
                activeWordIndex: activeWordIndex,
                socketID: socketConfig_1.default.id,
                gameID: gameState._id,
            });
        }
    }, [activeWordIndex]);
    function focus() {
        raceInputRef.current.focus();
    }
    (0, react_1.useEffect)(function () {
        try {
            setText(gameState.words);
            var user = gameState.players.find(function (player) { return player.socketID === socketConfig_1.default.id; });
            setPlayer(user);
            if (user.PartyLeader)
                setIsHost(true);
        }
        catch (err) {
            console.log(err);
        }
    }, [gameState]);
    function processInput(value) {
        if (value.endsWith(' ')) {
            if (value === text[activeWordIndex] + ' ') {
                setActiveWordIndex(function (index) { return index + 1; });
                setWrong(false);
                setUserInput('');
            }
            else {
                setWrong(true);
            }
        }
        else {
            setUserInput(value);
        }
    }
    return (react_1.default.createElement("div", { className: 'SocketContainer' }, isHost && !gameStart && (react_1.default.createElement("div", { className: 'roomCode' }, "Room Code: ", gameState._id, " ")), react_1.default.createElement("div", { className: 'typing-container socket-typing' }, text.length > 0 &&
        text.map(function (element, index) {
            return (react_1.default.createElement(Word_1.default, { element: element, activeWordIndex: activeWordIndex, key: index, listID: index, wrong: wrong }));
        })), react_1.default.createElement("div", { className: 'inputDiv' }, react_1.default.createElement("input", { ref: raceInputRef, type: 'text', className: 'inputBar', disabled: ((gameStart === false) || ((gameOver === true) && 'disabled')), onChange: function (e) {
            processInput(e.target.value);
        }, value: userInput, maxLength: 18 }), react_1.default.createElement(StartButton_1.default, { gameState: gameState, isHost: isHost, player: player }), react_1.default.createElement(countDown_1.default, { setGameStart: setGameStart }), react_1.default.createElement(gameTimer_1.default, { player: player, gameOver: gameOver }), react_1.default.createElement(progressBar_1.default, { gameState: gameState, text: text, setGameState: setGameState }), gameOver && react_1.default.createElement("button", null, " Start Again "))));
}
exports.default = SocketMain;
