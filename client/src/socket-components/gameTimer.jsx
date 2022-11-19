import './css/gameTimer.css';
import { useEffect, useState } from 'react';
import socket from './socketConfig';
//  TODO implement context (or Redux)

export default function GameTimer({ gameOver, player }) {
  const [gameTimer, setGameTimer] = useState({ timer: '', message: '' });
  const [WPM, setWPM] = useState('');

  socket.on('gameTimer', (data) => {
    setGameTimer(data);
    console.log(data.timer);
  });

  useEffect(() => {
    if (player) {
      setWPM(player.WPM);
    }
  }, [player]);

  return (
    <>
      {gameTimer.timer !== 0 || !gameOver && (
        <div className='gameTimerMessage'>
          {gameTimer.timer}
          {gameTimer.message}
        </div>
      )}
    </>
  );
}
