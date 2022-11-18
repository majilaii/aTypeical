import { useEffect, useState } from 'react';
import './css/progressBar.css';
import socket from './socketConfig';

export default function ProgressBar({ player, gameState, text, setGameState }) {
  // TODO This doesn't seem to be in use, please check
  const [perc, setPerc] = useState('0%');
  useEffect(() => {
    socket.on('gameUpdate', (data) => {
      setGameState(data);
    });
    socket.on('gameFinished', (data) => {
      setGameState(data);
    });
  }, [gameState]);

  return (
    <div className='progress'>
      {gameState.players.map((el) => {
        return (
          <>
          {/* TODO rename the class */}
            <p className='imbored'>
              {' '}
              {el.nickname}{' '}
              {/* TODO && */}
              {gameState.gameOver === true ? el.WPM + 'WPM' : null}{' '}
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
              {el.index ? (
                <p className='imbored'>
                  {/* TODO && */}
                  {(100 * (el.index / text.length)).toFixed(1)}%
                </p>
              ) : null}
            </div>
          </>
        );
      })}
    </div>
  );
}