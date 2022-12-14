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
require("./css/choicePage.css");
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const socketConfig_1 = __importDefault(require("./socketConfig"));
function ChoicePage() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [roomInfo, setRoomInfo] = (0, react_1.useState)({ gameID: '', nickname: '' });
    const { gameState, setGameState } = (0, react_router_dom_1.useOutletContext)();
    (0, react_1.useEffect)(() => {
        socketConfig_1.default.on('createdGame', (game, id) => {
            console.log(game, id);
            if (game)
                setGameState(game);
        });
        socketConfig_1.default.on('joinGame', (game) => {
            if (game)
                setGameState(game);
        });
    });
    function saveData(e) {
        setRoomInfo({ ...roomInfo, [e.target.name]: e.target.value });
    }
    function makeRoom() {
        socketConfig_1.default.emit('createRoom', roomInfo);
    }
    function joinRoom() {
        socketConfig_1.default.emit('joinRoom', roomInfo);
    }
    (0, react_1.useEffect)(() => {
        if (gameState !== null)
            navigate(`/socket/${gameState._id}`);
    });
    return (react_1.default.createElement("div", { className: 'choiceContainer' },
        react_1.default.createElement("div", { className: 'joinRoom' },
            react_1.default.createElement("div", { className: 'roomContainer' },
                react_1.default.createElement("input", { type: 'text', className: 'email', placeholder: 'nickname', name: 'nickname', onChange: (e) => saveData(e) }),
                react_1.default.createElement("input", { type: 'text', className: 'email', placeholder: 'lobby ID', name: 'gameID', onChange: (e) => saveData(e) }),
                react_1.default.createElement("button", { className: 'submit', onClick: joinRoom },
                    ' ',
                    "JOIN ROOM"))),
        react_1.default.createElement("div", { className: 'inviteFriend' },
            react_1.default.createElement("div", { className: 'makeRoom' },
                react_1.default.createElement("input", { type: 'text', className: 'email', name: 'nickname', placeholder: 'nickname', onChange: (e) => saveData(e), onKeyUp: (e) => {
                        if (e.key === 'Enter')
                            makeRoom();
                    } }),
                react_1.default.createElement("button", { className: 'submit makeSubmit', disabled: (roomInfo.nickname === '' && 'disabled'), onClick: makeRoom },
                    ' ',
                    "MAKE ROOM",
                    ' ')))));
}
exports.default = ChoicePage;
