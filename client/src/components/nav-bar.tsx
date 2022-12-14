import '../css/nav-bar.css';
import { Link, useNavigate } from 'react-router-dom';
import APIservice from '../APIService';
import React from 'react';

export default function NavBar({ isAuthenticated, setIsAuthenticated }: { isAuthenticated: boolean, setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>> }) {
  const navigate = useNavigate();

  async function logout() {
    const res = await APIservice.logout();
    if (res.message) {
      localStorage.removeItem('userData');
      setIsAuthenticated(false);
      navigate('/');
    }
  }

  function toRace() {
    navigate('/race');
  }

  const linkTarget = {
    pathname: '/',
    key: Math.random(), // we could use Math.random, but that's not guaranteed unique.
    state: {
      applied: true,
    },
  };

  return (
    <div className='navContainer'>
      <Link to={linkTarget} className='link'>
        aTYPEical
      </Link>
      <div className='wrapper'>
        <div className='tagline'>This is a typing app.</div>
      </div>

      <div className='buttons'>
        {isAuthenticated && (
          <Link to='/profile' className='linkLogin'>
            <button className='profile'>PROFILE</button>{' '}
          </Link>
        )}
        {window.location.href !== 'http://localhost:3000/race' && (
          <button className='raceButton' onClick={toRace}>
            {' '}
            RACE{' '}
          </button>
        )}
        {isAuthenticated === false ? (
          <Link to='/login' className='linkLogin'>
            <button className='logIn'>LOGIN</button>{' '}
          </Link>
        ) : (
          <button className='logIn' onClick={logout}>
            LOGOUT
          </button>
        )}
      </div>
    </div>
  );
}
