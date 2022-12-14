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
  const { gameState, setGameState } = useOutletContext() as any;
  const [gameStart, setGameStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [text, setText] = useState([]);
  const [isHost, setIsHost] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [wrong, setWrong] = useState(false);
  const [player, setPlayer] = useState(null);
  const raceInputRef = useRef(null);

  useEffect(() => {
    socket.on('gameFinished', (data) => {
      setGameState(data);
      setGameOver(true);
    });
  }, []);

  useEffect(() => {
    if (gameStart) focus();
  }, [gameStart]);

  useEffect(() => {
    window.addEventListener('keydown', focus);
  }, []);

  useEffect(() => {
    if (activeWordIndex > 0) {
      socket.emit('indexIncrease', {
        textLength: gameState.words.length,
        activeWordIndex,
        socketID: socket.id,
        gameID: gameState._id,
      });
    }
  }, [activeWordIndex]);

  function focus() {
    raceInputRef.current.focus();
  }

  useEffect(() => {
    try {
      setText(gameState.words);
      const user = gameState.players.find(
        (player: { socketID: string; }) => player.socketID === socket.id
      );
      setPlayer(user);
      if (user.PartyLeader) setIsHost(true);
    } catch (err) {
      console.log(err);
    }
  }, [gameState]);

  function processInput(value: string) {
    if (value.endsWith(' ')) {
      if (value === text[activeWordIndex] + ' ') {
        setActiveWordIndex((index) => index + 1);
        setWrong(false);
        setUserInput('');
      } else {
        setWrong(true);
      }
    } else {
      setUserInput(value);
    }
  }

  return (
    <div className='SocketContainer'>
      {isHost && !gameStart && (
        <div className='roomCode'>Room Code: {gameState._id} </div>
      )}
      <div className='typing-container socket-typing'>
        {text.length > 0 && 
          text.map((element, index) => {
              return (
                <Word
                  element={element}
                  activeWordIndex={activeWordIndex}
                  key={index}
                  listID={index}
                  wrong={wrong}
                />
              );
            })}
      </div>

      <div className='inputDiv'>
        <input
          ref={raceInputRef}
          type='text'
          className='inputBar'
          disabled={
            ((gameStart === false) || ((gameOver === true) && 'disabled') as unknown as boolean)
          }
          onChange={(e) => {
            processInput(e.target.value);
          }}
          value={userInput}
          maxLength={18}
        />
        <StartButton
          gameState={gameState}
          isHost={isHost}
          player={player}
        />
        <CountDown setGameStart={setGameStart} />
        <GameTimer player={player} gameOver={gameOver} />
        <ProgressBar
          gameState={gameState}
          text={text}
          setGameState={setGameState}
        />
        {gameOver && <button> Start Again </button>}
      </div>
    </div>
  );
}
