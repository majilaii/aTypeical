import '../css/register-login.css';
import React, { useState, useEffect } from 'react';
import APIservice from '../APIService/index';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  // TODO context or Redux
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const { setIsAuthenticated } = useOutletContext() as any;
  const [alertMessage] = useState('your Email sucks ass btw');

  useEffect(() => {
    if (localStorage.getItem('userData') !== null) navigate('/profile');
  }, []);

  const register = async () => {
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
        <Link to='/login' reloadDocument className='linkLogin'>
          <p className='have-account-register'>Already have an account?</p>
          <p className='login-register-link'>Log in</p>
        </Link>
      </div>
    </div>
  );
}
