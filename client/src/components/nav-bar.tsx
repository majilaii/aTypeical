import '../css/nav-bar.css';
import { Link, useNavigate } from 'react-router-dom';
import APIservice from '../APIService';
import React from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import authenticated from '../redux/actions/authenticated'



export default function NavBar() {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.authenticatedReducer.isAuthenticated);
  const dispatch = useAppDispatch();

  async function logout() {
    const res = await APIservice.logout();
    if (res.message) {
      localStorage.removeItem('userData');
      dispatch(authenticated.logout());
      navigate('/');
    }
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
      <div className="group">
        <Link to={linkTarget} className='link'>
          aTYPEical
        </Link>
        <div className='wrapper'>
          <div className='tagline'>This is a typing app.</div>
        </div>
      </div>

      <div className='buttons group'>
        {isAuthenticated && (
          <Link to='/profile' className='linkLogin'>
            <button className='profile'>PROFILE</button>{' '}
          </Link>
        )}
        {window.location.href !== 'http://localhost:3000/race' && (
          <button className='raceButton' onClick={()=>{navigate('/race')}}>
            {' '}
            RACE{' '}
          </button>
        )}
        {isAuthenticated === false && window.location.href !== 'http://localhost:3000/login'? (
          <Link to='/login' className='linkLogin'>
            <button className='logIn'>LOGIN</button>{' '}
          </Link>
        ) : window.location.href !== 'http://localhost:3000/login' ? (
          <button className='logIn' onClick={logout}>
            LOGOUT
          </button>
        ) : (
          <button className='logIn' onClick={() => navigate('/register')}>
            REGISTER
          </button>
        ) 
        }
      </div>
    </div>
  );
}
