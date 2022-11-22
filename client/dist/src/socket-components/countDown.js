import './css/countDown.css';
import socket from './socketConfig';
import React, { useState, useEffect } from 'react';
export default function CountDown(_a) {
    var setGameStart = _a.setGameStart;
    //  TODO context or Redux
    var _b = useState({ time: '', message: '' }), countDown = _b[0], setCountdown = _b[1];
    socket.on('timer', function (data) {
        setCountdown(data);
        console.log(data.time);
    });
    useEffect(function () {
        if (typeof countDown.time === 'number' && countDown.time === 0) {
            setGameStart(true);
        }
    });
    return (React.createElement(React.Fragment, null, typeof countDown.time === 'number' && countDown.time !== 0 && (React.createElement("div", { className: 'countdownMessage' },
        countDown.message,
        countDown.time))));
}
