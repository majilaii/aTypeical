import '../css/stats-page.css';
import React, { useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';

import Data from './data';
import APIservice from '../APIService';

export function CalculateRawWPM(text: string[], speed: number) {
  return Math.round(text.length / 5 / (speed / 1000 / 60));
}

export default function Stats() {
  const {
    text,
    speed,
    incorrect,
    setIsAuthenticated,
    isAuthenticated,
    KEnglish,
    wordAmount,
    typingMode,
  } = useOutletContext() as any;

  useEffect(() => {
    if (localStorage.getItem('userData') !== null) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      (async function update() {
        const user = {
          date: Date.now(),
          text: text.length,
          speed: speed,
          incorrect: incorrect,
          wordAmount,
          typingMode,
          KEnglish,
        };
        await APIservice.update(user);
      })();
    }
  }, []);

  const linkTarget = {
    pathname: '/',
    key: Math.random(),
    state: {
      applied: true,
    },
  };
  const LoginTarget = {
    pathname: '/register',
    key: Math.random(),
    state: {
      applied: true,
    },
  };
  const adjustedWPM = Math.round(
    (text.length - incorrect) / 5 / (speed / 1000 / 60)
  );
  return (
    <>
      <div className="statsContainer">
        <p className="stats">
          <span className="description"> Time: </span>
          {(speed / 1000).toFixed(2)}
          <br />
          <span className="otherTime">
            {new Date(speed).toISOString().slice(11, 19)} duration
          </span>
        </p>
        <p className="stats">
          <span className="description"> Raw WPM: </span>
          {CalculateRawWPM(text, speed)}
          <br />
        </p>
        <p className="stats">
          <span className="description"> WPM: </span>
          {Math.max(0, adjustedWPM)}
        </p>
        <p className="stats">
          <span className="description"> Accuracy: </span>
          {((100 * (text.length - incorrect)) / text.length).toFixed(2)}%
        </p>
      </div>
      <Data />
      <Link to={linkTarget} reloadDocument className="linkReset">
        <img
          alt="reload"
          className="icon"
          src="https://htmlacademy.ru/assets/icons/reload-6x-white.png"
        />
      </Link>
      {!isAuthenticated && (
        <p className="loginMessage">
          {' '}
          <Link to={LoginTarget} className="linkLogin">
            log in
          </Link>{' '}
          to save results{' '}
        </p>
      )}
    </>
  );
}
