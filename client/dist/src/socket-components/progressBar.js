import React, { useEffect } from 'react';
import './css/progressBar.css';
import socket from './socketConfig';
export default function ProgressBar(_a) {
    var gameState = _a.gameState, text = _a.text, setGameState = _a.setGameState;
    useEffect(function () {
        socket.on('gameUpdate', function (data) {
            setGameState(data);
        });
        socket.on('gameFinished', function (data) {
            setGameState(data);
        });
    });
    return (React.createElement("div", { className: 'progress' }, gameState.players.map(function (el) {
        return (React.createElement(React.Fragment, null,
            React.createElement("p", { className: 'playerName' },
                ' ',
                el.nickname,
                ' ',
                gameState.gameOver === true && el.WPM + 'WPM',
                ' '),
            React.createElement("div", { className: 'bodyProgress' },
                React.createElement("div", { className: 'currentProgress', style: {
                        width: "".concat(100 * (el.index / text.length), "%"),
                        height: "30px",
                    } }, ' '),
                el.index && (React.createElement("p", { className: 'playerName' },
                    (100 * (el.index / text.length)).toFixed(1),
                    "%")))));
    })));
}
