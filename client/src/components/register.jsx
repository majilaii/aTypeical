// TODO Separate login and register
import '../css/register.css';
import React, { useState, useEffect } from 'react';
import APIservice from '../APIService/index';
import { useNavigate, useOutletContext } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  // TODO context or Redux
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const { isAuthenticated, setIsAuthenticated } = useOutletContext();
  const [alertMessage, setAlertMessage] = useState('your Email sucks ass btw');

  useEffect(() => {
    if (localStorage.getItem('userData') !== null) navigate('/profile');
  }, []);

  const register = async (e) => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(registerEmail) === false) {
      setRegisterEmail((registerEmail) => (registerEmail = ''));
      setRegisterUsername('');
      setRegisterPassword('');
      alert(alertMessage);
      return;
    }

    const user = {
      email: registerEmail,
      username: registerUsername,
      password: registerPassword,
    };
    const res = await APIservice.register(user);
    if (res.error) {
      alert('user already exists');
    } else {
      setRegisterEmail('');
      setRegisterPassword('');
      setRegisterEmail('');
      setIsAuthenticated(true);
      navigate('/profile');
    }
  };
  const login = async (e) => {
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
      <div className='register'>
        <h1 className='formTitle'>Register</h1>
        <input
          id='email'
          placeholder='email'
          value={registerEmail} 
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <input
          id='username'
          placeholder='username'
          value={registerUsername}
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          id='password'
          placeholder='password'
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') register();
          }}
        />
        <button id='buttonRegister' onClick={register} className='submit'>
          Register
        </button>
      </div>

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
        <button id='buttonLogin'onClick={login} className='submit'>
          Login
        </button>
      </div>
    </div>
  );
}
