import './css/choicePage.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import socket from './socketConfig';

export default function ChoicePage() {
  const navigate = useNavigate();
  const [roomInfo, setRoomInfo] = useState({ gameID: '', nickname: '' });
  const { gameState, setGameState } =
    useOutletContext() as any;

  useEffect(() => {
    socket.on('createdGame', (game, id) => {
      console.log(game, id);
      if (game) setGameState(game);
    });

    socket.on('joinGame', (game) => {
      if (game) setGameState(game);
    });
  });

  function saveData(e: React.ChangeEvent<HTMLInputElement>) {
    setRoomInfo({ ...roomInfo, [e.target.name]: e.target.value });
  }

  function makeRoom() {
    socket.emit('createRoom', roomInfo);
  }

  function joinRoom() {
    socket.emit('joinRoom', roomInfo);
  }

  useEffect(() => {
    if (gameState !== null) navigate(`/socket/${gameState._id}`);
  });

  return (
    <div className='choiceContainer'>
      <div className='joinRoom'>
        <div className='roomContainer'>
          <input
            type='text'
            className='email'
            placeholder='nickname'
            name='nickname'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveData(e)}
          />
          <input
            type='text'
            className='email'
            placeholder='lobby ID'
            name='gameID'
            onChange={(e) => saveData(e)}
          />
          <button className='submit' onClick={joinRoom}>
            {' '}
            JOIN ROOM
          </button>
        </div>
      </div>
      <div className='inviteFriend'>
        <div className='makeRoom'>
          <input
            type='text'
            className='email'
            name='nickname'
            placeholder='nickname'
            onChange={(e) => saveData(e)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') makeRoom();
            }}
          />
          <button
            className='submit makeSubmit'
            disabled={(roomInfo.nickname === '' && 'disabled') as unknown as boolean}
            onClick={makeRoom}
          >
            {' '}
            MAKE ROOM{' '}
          </button>
        </div>
      </div>
    </div>
  );
}
