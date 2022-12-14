import './css/gameTimer.css';
import React, { useEffect, useState } from 'react';
import socket from './socketConfig';
//  TODO implement context (or Redux)
export default function GameTimer(_a) {
    var gameOver = _a.gameOver, player = _a.player;
    var _b = useState({ timer: '', message: '' }), gameTimer = _b[0], setGameTimer = _b[1];
    var _c = useState(''), WPM = _c[0], setWPM = _c[1];
    socket.on('gameTimer', function (data) {
        setGameTimer(data);
        console.log(data.timer);
    });
    useEffect(function () {
        if (player) {
            setWPM(player.WPM);
        }
    }, [player]);
    return (React.createElement(React.Fragment, null, (typeof gameTimer.timer === 'number' && gameTimer.timer !== 0 || !gameOver) && (React.createElement("div", { className: 'gameTimerMessage' },
        gameTimer.timer,
        gameTimer.message))));
}
