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
require("./css/socketMain.css");
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const StartButton_1 = __importDefault(require("./StartButton"));
const socketConfig_1 = __importDefault(require("./socketConfig"));
const Word_1 = __importDefault(require("./Word"));
const countDown_1 = __importDefault(require("./countDown"));
const gameTimer_1 = __importDefault(require("./gameTimer"));
const progressBar_1 = __importDefault(require("./progressBar"));
function SocketMain() {
    // TODO context (maybe new context just for socket), or Redux
    const { gameState, setGameState } = (0, react_router_dom_1.useOutletContext)();
    const [gameStart, setGameStart] = (0, react_1.useState)(false);
    const [gameOver, setGameOver] = (0, react_1.useState)(false);
    const [text, setText] = (0, react_1.useState)([]);
    const [isHost, setIsHost] = (0, react_1.useState)(false);
    const [userInput, setUserInput] = (0, react_1.useState)('');
    const [activeWordIndex, setActiveWordIndex] = (0, react_1.useState)(0);
    const [wrong, setWrong] = (0, react_1.useState)(false);
    const [player, setPlayer] = (0, react_1.useState)(null);
    const raceInputRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        socketConfig_1.default.on('gameFinished', (data) => {
            setGameState(data);
            setGameOver(true);
        });
    }, []);
    (0, react_1.useEffect)(() => {
        if (gameStart)
            focus();
    }, [gameStart]);
    (0, react_1.useEffect)(() => {
        window.addEventListener('keydown', focus);
    }, []);
    (0, react_1.useEffect)(() => {
        if (activeWordIndex > 0) {
            socketConfig_1.default.emit('indexIncrease', {
                textLength: gameState.words.length,
                activeWordIndex,
                socketID: socketConfig_1.default.id,
                gameID: gameState._id,
            });
        }
    }, [activeWordIndex]);
    function focus() {
        raceInputRef.current.focus();
    }
    (0, react_1.useEffect)(() => {
        try {
            setText(gameState.words);
            const user = gameState.players.find((player) => player.socketID === socketConfig_1.default.id);
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
                setActiveWordIndex((index) => index + 1);
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
    return (react_1.default.createElement("div", { className: 'SocketContainer' },
        isHost && !gameStart && (react_1.default.createElement("div", { className: 'roomCode' },
            "Room Code: ",
            gameState._id,
            " ")),
        react_1.default.createElement("div", { className: 'typing-container socket-typing' }, text.length > 0 &&
            text.map((element, index) => {
                return (react_1.default.createElement(Word_1.default, { element: element, activeWordIndex: activeWordIndex, key: index, listID: index, wrong: wrong }));
            })),
        react_1.default.createElement("div", { className: 'inputDiv' },
            react_1.default.createElement("input", { ref: raceInputRef, type: 'text', className: 'inputBar', disabled: ((gameStart === false) || ((gameOver === true) && 'disabled')), onChange: (e) => {
                    processInput(e.target.value);
                }, value: userInput, maxLength: 18 }),
            react_1.default.createElement(StartButton_1.default, { gameState: gameState, isHost: isHost, player: player }),
            react_1.default.createElement(countDown_1.default, { setGameStart: setGameStart }),
            react_1.default.createElement(gameTimer_1.default, { player: player, gameOver: gameOver }),
            react_1.default.createElement(progressBar_1.default, { gameState: gameState, text: text, setGameState: setGameState }),
            gameOver && react_1.default.createElement("button", null, " Start Again "))));
}
exports.default = SocketMain;
