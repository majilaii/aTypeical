"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
require("./css/choicePage.css");
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var socketConfig_1 = __importDefault(require("./socketConfig"));
function ChoicePage() {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, react_1.useState)({ gameID: '', nickname: '' }), roomInfo = _a[0], setRoomInfo = _a[1];
    var _b = (0, react_router_dom_1.useOutletContext)(), gameState = _b.gameState, setGameState = _b.setGameState;
    (0, react_1.useEffect)(function () {
        socketConfig_1.default.on('createdGame', function (game, id) {
            console.log(game, id);
            if (game)
                setGameState(game);
        });
        socketConfig_1.default.on('joinGame', function (game) {
            if (game)
                setGameState(game);
        });
    });
    function saveData(e) {
        var _a;
        setRoomInfo(__assign(__assign({}, roomInfo), (_a = {}, _a[e.target.name] = e.target.value, _a)));
    }
    function makeRoom() {
        socketConfig_1.default.emit('createRoom', roomInfo);
    }
    function joinRoom() {
        socketConfig_1.default.emit('joinRoom', roomInfo);
    }
    (0, react_1.useEffect)(function () {
        if (gameState !== null)
            navigate("/socket/".concat(gameState._id));
    });
    return (react_1.default.createElement("div", { className: 'choiceContainer' }, react_1.default.createElement("div", { className: 'joinRoom' }, react_1.default.createElement("div", { className: 'roomContainer' }, react_1.default.createElement("input", { type: 'text', className: 'email', placeholder: 'nickname', name: 'nickname', onChange: function (e) { return saveData(e); } }), react_1.default.createElement("input", { type: 'text', className: 'email', placeholder: 'lobby ID', name: 'gameID', onChange: function (e) { return saveData(e); } }), react_1.default.createElement("button", { className: 'submit', onClick: joinRoom }, ' ', "JOIN ROOM"))), react_1.default.createElement("div", { className: 'inviteFriend' }, react_1.default.createElement("div", { className: 'makeRoom' }, react_1.default.createElement("input", { type: 'text', className: 'email', name: 'nickname', placeholder: 'nickname', onChange: function (e) { return saveData(e); }, onKeyUp: function (e) {
            if (e.key === 'Enter')
                makeRoom();
        } }), react_1.default.createElement("button", { className: 'submit makeSubmit', disabled: (roomInfo.nickname === '' && 'disabled'), onClick: makeRoom }, ' ', "MAKE ROOM", ' ')))));
}
exports.default = ChoicePage;
