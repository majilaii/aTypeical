// TODO Separate login and register
import '../css/register-login.css';
import React, { useState, useEffect } from 'react';
import APIservice from '../APIService/index';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  // TODO context or Redux
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const { setIsAuthenticated } = useOutletContext() as any;

  useEffect(() => {
    if (localStorage.getItem('userData') !== null) navigate('/profile');
  }, []);

  const login = async () => {
    const user = { username: loginUsername, password: loginPassword };
    const res = await APIservice.login(user);
    if (res.error) {
      alert(`${res.message}`);
      setLoginUsername('');
      setLoginPassword('');
    } else {
      setIsAuthenticated(true);
      localStorage.setItem('userData', JSON.stringify(res));
      navigate('/profile');
    }
  };

  return (
    <div className='forms-container'>
      <div className='login'>
        <h1 className='formTitle'>Login</h1>
        <input
          id='usernameLogin'
          placeholder='username'
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          id='passwordLogin'
          placeholder='password'
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') login();
          }}
        />
        <button id='buttonLogin' onClick={login} className='submit'>
          Login
        </button>
        <Link to='/register' reloadDocument className='linkRegister'>
          <p className='have-account-register'>New user?</p>
          <p className='login-register-link'>Register</p>
        </Link>
      </div>
    </div>
  );
}
