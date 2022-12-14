import React, { useState } from 'react';
import socket from './socketConfig';

export default function StartButton({
  player,
  isHost,
  gameState,
}: {
  player: any,
  isHost: boolean,
  gameState: any
}) {
  const [startCount, setStartCount] = useState(false);
  function startGame() {
    setStartCount(true);
    socket.emit('gameStart', { playerID: player._id, gameID: gameState._id });
  }

  return (
    <>
      {isHost && startCount === false && (
        <button className='resetButton' onClick={startGame}>
          {' '}
          START{' '}
        </button>
      )}
    </>
  );
}
