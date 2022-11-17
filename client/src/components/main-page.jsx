import '../css/main-page.css';
import { useEffect, useState, useRef } from 'react';
import { useOutletContext, useNavigate, Link } from 'react-router-dom';
import APIservice from '../APIService/index.js';
import Bar from './choiceBar.jsx';

export default function Main() {
  const navigate = useNavigate();
  const linkTarget = {
    pathname: '/',
    key: Math.random(), // we could use Math.random, but that's not guaranteed unique.
    state: {
      applied: true,
    },
  };
  // TODO remove the unused variables
  const {
    setWordAmount,
    setIncorrect,
    setSpeed,
    typingMode,
    text,
    setText,
    author,
    reset,
    setReset,
    prevInputLength,
    setPrevInputLength,
    adjustedWPM,
    incorrect,
    setAdjustedWPM,
    setIsAuthenticated,
  } = useOutletContext();

  // TODO potentially move to context (or to Redux, if we use)
  // TODO setCheckInput to a boolean instead of 0-1
  const [checkFirstInput, setCheckInput] = useState(0);
  const [loading, setLoading] = useState(true);

  const inputRef = useRef(null);
  let interval;

  useEffect(() => {
    async function isLoggedIn() {
      const res = await APIservice.profile();
      if (!res) {
        // TODO check where else we're using local storage
        localStorage.removeItem('userData');
        setIsAuthenticated(false);
      } else setIsAuthenticated(true);
    }

    isLoggedIn();
  }, []);

  useEffect(() => {
    if (checkFirstInput !== 0) {
      // TODO replace setInterval function
      interval = setInterval(() => {
        try {
          if (inputRef.current.value.length) {
            setPrevInputLength((arr) => [
              ...arr,
              inputRef.current.value.length,
            ]);
          }
        } catch (err) {
          clearInterval(interval);
        }
      }, 1000);
    }
  }, [checkFirstInput]);

  useEffect(() => {
    // TODO double-check that this only adds one event listener
    window.addEventListener('keydown', focus);
    inputRef.current.value = '';
    setCheckInput(0);
    setLoading(false);
  }, [reset]);

  const preventCopyPaste = (e) => {
    e.preventDefault();
  };

  // TODO more descriptive name?
  function focus() {
    inputRef.current.focus();
  }

  // TODO probably don't need this function inside the function this time
  function changeWordAmount(num) {
    setWordAmount(num);
  }

  // TODO move into a separate file (separate into smaller functions)
  function textValidate(e) {
    if (checkFirstInput === 0) {
      setCheckInput(1);
      setSpeed(Date.now());
    }
    // TODO crate a variable to store e.target.value
    for (let i = 0; i < e.target.value.length; i++) {
      const current = text[i];
      if (current.letter === e.target.value[i]) {
        current.correct = 'correct';
      } else if (current.letter !== e.target.value[i]) {
        // TODO change else if to just else
        current.correct = 'incorrect';
        // setErrors(errors => errors+1)
      }
    }

    if (text[e.target.value.length + 1]) {
      text[e.target.value.length].correct = 'neutral';
      text[e.target.value.length].active = 'false';
    }

    // TODO remove for-loop and use length instead
    for (let i = 0; i < e.target.value.length; i++) {
      if (text[i + 1] && text[i + 1].correct === 'neutral') {
        text[i].active = 'true';
        break;
      }
      let current = text[i];
      current.active = 'false';
    }

    setText([...text]);

    if (e.target.value.length === text.length) {
      const currentTime = new Date();
      // TODO try moving the line below to the reset function
      setIncorrect(0);
      for (let obj of text) {
        for (let key in obj) {
          if (obj[key] === 'incorrect') {
            setIncorrect((incorrect) => (incorrect += 1));
          }
        }
      }
      setSpeed((time) => currentTime - time);
      setPrevInputLength((arr) => [...arr, e.target.value.length]);
      clearInterval(interval);
      navigate('/stats');
    }
  }

  return (
    <>
      <div className='Main-container'>
        <Bar
          changeWordAmount={changeWordAmount}
          setCheckInput={setCheckInput}
        />
        <div className='typing-container' id='typingContainer'>
          <p
            onCopy={(e) => preventCopyPaste(e)}
            onPaste={(e) => preventCopyPaste(e)}
            onCut={(e) => preventCopyPaste(e)}
            id='textArea'
          >
            {text.map((el, i) => {
              return (
                <span
                  className={`${
                    el.correct === 'neutral'
                      ? 'neutral'
                      : el.correct === 'correct'
                      ? 'correct'
                      : 'incorrect'
                  } ${el.active === 'true' ? 'active' : ''}`}
                  key={i}
                  id={i}
                >
                  {el.letter}
                </span>
              );
            })}
          </p>
          {/* TODO && instead of ? */}
          {typingMode === 1 ? <span className='author'>- {author}</span> : null}
        </div>
        <div className='inputDiv'>
          <input
            ref={inputRef}
            type='text'
            className='inputBar'
            onChange={textValidate}
          />
          <Link to={linkTarget} reloadDocument className='linkReset'>
            <button className='resetButton'>Reset</button>
          </Link>
        </div>
      </div>
    </>
  );
}
