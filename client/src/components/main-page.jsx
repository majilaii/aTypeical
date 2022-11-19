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
  const {
    setWordAmount,
    setIncorrect,
    setSpeed,
    typingMode,
    text,
    setText,
    author,
    reset,
    setPrevInputLength,
    setIsAuthenticated,
  } = useOutletContext();

  // TODO potentially move to context (or to Redux, if we use)

  const [checkFirstInput, setCheckInput] = useState(false);
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
  });

  useEffect(() => {
    if (checkFirstInput !== false) {
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
    setCheckInput(false);
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

    let value = e.target.value;

    if (checkFirstInput === false) {
      setCheckInput(true);
      setSpeed(Date.now());
    }

    for (let i = 0; i < value.length; i++) {
      const current = text[i];
      if (current.letter === value[i]) {
        current.correct = 'correct';
      } else {
        current.correct = 'incorrect';
      }
    }

    if (text[value.length + 1]) {
      text[value.length].correct = 'neutral';
      text[value.length].active = 'false';
    }

    // TODO remove for-loop and use length instead
    for (let i = 0; i < value.length; i++) {
      if (text[i + 1] && text[i + 1].correct === 'neutral') {
        text[i].active = 'true';
        break;
      }
      let current = text[i];
      current.active = 'false';
    }

    setText([...text]);

    if (value.length === text.length) {
      const currentTime = new Date();
      // TODO try moving the line below to the reset function
      setIncorrect(false);
      for (let obj of text) {
        for (let key in obj) {
          if (obj[key] === 'incorrect') {
            setIncorrect((incorrect) => (incorrect += 1));
          }
        }
      }
      setSpeed((time) => currentTime - time);
      setPrevInputLength((arr) => [...arr, value.length]);
      clearInterval(interval);
      navigate('/stats');
    }
  }

  return (
    <>
      <div className="Main-container">
        <Bar
          changeWordAmount={changeWordAmount}
          setCheckInput={setCheckInput}
        />
        <div className="typing-container" id="typingContainer">
          <p
            onCopy={(e) => preventCopyPaste(e)}
            onPaste={(e) => preventCopyPaste(e)}
            onCut={(e) => preventCopyPaste(e)}
            id="textArea"
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
          {typingMode === 1 && <span className="author">- {author}</span>}
        </div>
        <div className="inputDiv">
          <input
            ref={inputRef}
            id="mainPageInput"
            type="text"
            className="inputBar"
            onChange={textValidate}
          />
          <Link to={linkTarget} reloadDocument className="linkReset">
            <button className="resetButton">Reset</button>
          </Link>
        </div>
      </div>
    </>
  );
}
