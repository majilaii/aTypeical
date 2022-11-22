import React, { useState } from 'react';
import socket from './socketConfig';
export default function StartButton(_a) {
    var player = _a.player, isHost = _a.isHost, gameState = _a.gameState;
    var _b = useState(false), startCount = _b[0], setStartCount = _b[1];
    function startGame() {
        setStartCount(true);
        socket.emit('gameStart', { playerID: player._id, gameID: gameState._id });
    }
    return (React.createElement(React.Fragment, null, isHost && startCount === false && (React.createElement("button", { className: 'resetButton', onClick: startGame },
        ' ',
        "START",
        ' '))));
}
