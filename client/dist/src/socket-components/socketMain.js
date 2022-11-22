import './css/socketMain.css';
import React, { useEffect, useState, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import StartButton from './StartButton';
import socket from './socketConfig';
import Word from './Word';
import CountDown from './countDown';
import GameTimer from './gameTimer';
import ProgressBar from './progressBar';
export default function SocketMain() {
    // TODO context (maybe new context just for socket), or Redux
    var _a = useOutletContext(), gameState = _a.gameState, setGameState = _a.setGameState;
    var _b = useState(false), gameStart = _b[0], setGameStart = _b[1];
    var _c = useState(false), gameOver = _c[0], setGameOver = _c[1];
    var _d = useState([]), text = _d[0], setText = _d[1];
    var _e = useState(false), isHost = _e[0], setIsHost = _e[1];
    var _f = useState(''), userInput = _f[0], setUserInput = _f[1];
    var _g = useState(0), activeWordIndex = _g[0], setActiveWordIndex = _g[1];
    var _h = useState(false), wrong = _h[0], setWrong = _h[1];
    var _j = useState(null), player = _j[0], setPlayer = _j[1];
    var raceInputRef = useRef(null);
    useEffect(function () {
        socket.on('gameFinished', function (data) {
            setGameState(data);
            setGameOver(true);
        });
    }, []);
    useEffect(function () {
        if (gameStart)
            focus();
    }, [gameStart]);
    useEffect(function () {
        window.addEventListener('keydown', focus);
    }, []);
    useEffect(function () {
        if (activeWordIndex > 0) {
            socket.emit('indexIncrease', {
                textLength: gameState.words.length,
                activeWordIndex: activeWordIndex,
                socketID: socket.id,
                gameID: gameState._id,
            });
        }
    }, [activeWordIndex]);
    function focus() {
        raceInputRef.current.focus();
    }
    useEffect(function () {
        try {
            setText(gameState.words);
            var user = gameState.players.find(function (player) { return player.socketID === socket.id; });
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
    return (React.createElement("div", { className: 'SocketContainer' },
        isHost && !gameStart && (React.createElement("div", { className: 'roomCode' },
            "Room Code: ",
            gameState._id,
            " ")),
        React.createElement("div", { className: 'typing-container socket-typing' }, text.length > 0 &&
            text.map(function (element, index) {
                return (React.createElement(Word, { element: element, activeWordIndex: activeWordIndex, key: index, listID: index, wrong: wrong }));
            })),
        React.createElement("div", { className: 'inputDiv' },
            React.createElement("input", { ref: raceInputRef, type: 'text', className: 'inputBar', disabled: ((gameStart === false) || ((gameOver === true) && 'disabled')), onChange: function (e) {
                    processInput(e.target.value);
                }, value: userInput, maxLength: 18 }),
            React.createElement(StartButton, { gameState: gameState, isHost: isHost, player: player }),
            React.createElement(CountDown, { setGameStart: setGameStart }),
            React.createElement(GameTimer, { player: player, gameOver: gameOver }),
            React.createElement(ProgressBar, { gameState: gameState, text: text, setGameState: setGameState }),
            gameOver && React.createElement("button", null, " Start Again "))));
}
