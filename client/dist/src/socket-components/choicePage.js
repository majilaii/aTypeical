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
import './css/choicePage.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import socket from './socketConfig';
export default function ChoicePage() {
    var navigate = useNavigate();
    var _a = useState({ gameID: '', nickname: '' }), roomInfo = _a[0], setRoomInfo = _a[1];
    var _b = useOutletContext(), gameState = _b.gameState, setGameState = _b.setGameState;
    useEffect(function () {
        socket.on('createdGame', function (game, id) {
            console.log(game, id);
            if (game)
                setGameState(game);
        });
        socket.on('joinGame', function (game) {
            if (game)
                setGameState(game);
        });
    });
    function saveData(e) {
        var _a;
        setRoomInfo(__assign(__assign({}, roomInfo), (_a = {}, _a[e.target.name] = e.target.value, _a)));
    }
    function makeRoom() {
        socket.emit('createRoom', roomInfo);
    }
    function joinRoom() {
        socket.emit('joinRoom', roomInfo);
    }
    useEffect(function () {
        if (gameState !== null)
            navigate("/socket/".concat(gameState._id));
    });
    return (React.createElement("div", { className: 'choiceContainer' },
        React.createElement("div", { className: 'joinRoom' },
            React.createElement("div", { className: 'roomContainer' },
                React.createElement("input", { type: 'text', className: 'email', placeholder: 'nickname', name: 'nickname', onChange: function (e) { return saveData(e); } }),
                React.createElement("input", { type: 'text', className: 'email', placeholder: 'lobby ID', name: 'gameID', onChange: function (e) { return saveData(e); } }),
                React.createElement("button", { className: 'submit', onClick: joinRoom },
                    ' ',
                    "JOIN ROOM"))),
        React.createElement("div", { className: 'inviteFriend' },
            React.createElement("div", { className: 'makeRoom' },
                React.createElement("input", { type: 'text', className: 'email', name: 'nickname', placeholder: 'nickname', onChange: function (e) { return saveData(e); }, onKeyUp: function (e) {
                        if (e.key === 'Enter')
                            makeRoom();
                    } }),
                React.createElement("button", { className: 'submit makeSubmit', disabled: (roomInfo.nickname === '' && 'disabled'), onClick: makeRoom },
                    ' ',
                    "MAKE ROOM",
                    ' ')))));
}
