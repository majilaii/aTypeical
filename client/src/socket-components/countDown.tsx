import './css/countDown.css';
import socket from './socketConfig';
import React, { useState, useEffect } from 'react';

export default function CountDown({ setGameStart }: { setGameStart: React.Dispatch<React.SetStateAction<boolean>>}) {
  //  TODO context or Redux
  const [countDown, setCountdown] = useState({ time: '', message: '' });

  socket.on('timer', (data) => {
    setCountdown(data);
    console.log(data.time);
  });

  useEffect(() => {
    if (typeof countDown.time === 'number' && countDown.time === 0) {
      setGameStart(true);
    }
  });

  return (
    <>
      {typeof countDown.time === 'number' && countDown.time !== 0 && (
        <div className='countdownMessage'>
          {countDown.message}
          {countDown.time}
        </div>
      )}
    </>
  );
}
