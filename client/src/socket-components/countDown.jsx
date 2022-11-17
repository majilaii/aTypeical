import './css/countDown.css';
import socket from './socketConfig';
import { useState, useEffect } from 'react';

export default function CountDown({ setGameStart }) {
  //  TODO context or Redux
  const [countDown, setCoutdown] = useState({ time: '', message: '' });

  socket.on('timer', (data) => {
    setCoutdown(data);
    console.log(data.time);
  });

  useEffect(() => {
    if (countDown.time === 0) {
      setGameStart(true);
    }
  }, [countDown]);

  return (
    <>
    {/*  TODO && */}
      {countDown.time !== 0 ? (
        <div className='countdownMessage'>
          {countDown.message}
          {countDown.time}
        </div>
      ) : null}
    </>
  );
}
