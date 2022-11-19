import { useEffect } from 'react';
import './css/progressBar.css';
import socket from './socketConfig';

export default function ProgressBar({ gameState, text, setGameState }) {
  useEffect(() => {
    socket.on('gameUpdate', (data) => {
      setGameState(data);
    });
    socket.on('gameFinished', (data) => {
      setGameState(data);
    });
  });

  return (
    <div className='progress'>
      {gameState.players.map((el) => {
        return (
          <>
            <p className='playerName'>
              {' '}
              {el.nickname}{' '}
              {gameState.gameOver === true && el.WPM + 'WPM'}{' '}
            </p>
            <div className='bodyProgress'>
              <div
                className='currentProgress'
                style={{
                  width: `${100 * (el.index / text.length)}%`,
                  height: `30px`,
                }}
              >
                {' '}
              </div>
              {el.index && (
                <p className='playerName'>
                  {(100 * (el.index / text.length)).toFixed(1)}%
                </p>
              )}
            </div>
          </>
        );
      })}
    </div>
  );
}
