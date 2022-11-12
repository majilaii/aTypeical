import "../css/main-page.css";
import { useEffect, useState, useRef, ClipboardEvent } from "react";
import { useOutletContext, useNavigate, Link } from "react-router-dom";
import APIservice from "../APIService/index.js";
import Bar from "./choiceBar.jsx";

export default function Main() {
  const navigate = useNavigate()
    const linkTarget = {
        pathname: "/",
        key: Math.random(), // we could use Math.random, but that's not guaranteed unique.
        state: {
          applied: true
        }
    }
  const {setWordAmount, setIncorrect,  setSpeed, typingMode, text, setText, author,  reset, setReset, prevInputLength,setPrevInputLength, adjustedWPM, incorrect, setAdjustedWPM, setIsAuthenticated} = useOutletContext();
  const [checkFirstInput, setCheckInput] = useState(0);
  const [loading, setLoading] = useState(true)


  const inputRef = useRef(null)
  let interval;

  useEffect(() => {
    async function isLoggedIn() {
      const res = await APIservice.profile()
      console.log(res)
      if(!res) {
          localStorage.removeItem('userData')
          setIsAuthenticated(false)
      }else setIsAuthenticated(true)
    } 

    isLoggedIn()
  }, [])


 useEffect(() => {
    if (checkFirstInput !== 0) {
       interval = setInterval(() => {
        if(inputRef.current.value.length){
            setPrevInputLength(arr => [...arr, inputRef.current.value.length])
        }
    }, 1000);}
 }, [checkFirstInput])

  useEffect(() => {
    window.addEventListener("keydown", focus);
    inputRef.current.value = "";
    setCheckInput(0);
    setLoading(false)
  }, [reset]);

  const preventCopyPaste = (e) => {
    e.preventDefault();
  };

  function focus() {
    inputRef.current.focus();
  }

  function changeWordAmount(num) {
    setWordAmount(num);
  }

  
  function textValidate(e) {
    if (checkFirstInput === 0) {
      setCheckInput(1);
      setSpeed(Date.now());
    }
    for (let i = 0; i < e.target.value.length; i++) {
      const current = text[i];
      if (current.letter === e.target.value[i]) {
        current.correct = "correct";
      } else if (current.letter !== e.target.value[i]) {
        current.correct = "incorrect";
        // setErrors(errors => errors+1)
      }
    }

    if (text[e.target.value.length + 1]) {
      text[e.target.value.length].correct = "neutral";
    }
 
    setText([...text]);

    if (e.target.value.length === text.length) {
      const currentTime = new Date();
      setIncorrect(0)
      for (let obj of text) {

        for (let key in obj) {
          
          if (obj[key] === "incorrect") {
            setIncorrect((incorrect) => (incorrect += 1));
          }
        }
      }
      setSpeed((time) => currentTime - time);
      setPrevInputLength(arr => [...arr, e.target.value.length])
      clearInterval(interval)
      navigate("/stats");
    }
  }

  return (

    
      <>
        <div className="Main-container">

          <Bar
            changeWordAmount={changeWordAmount}
            setCheckInput={setCheckInput}
          />
          <div
            className="typing-container"
            // onClick={focus}/
            id="typingContainer"
          >
            <p
              onCopy={(e) => preventCopyPaste(e)}
              onPaste={(e) => preventCopyPaste(e)}
              onCut={(e) => preventCopyPaste(e)}
              id="textArea"
            >
              {text.map((el, i) => {
                return (
                  <span
                    className={
                      el.correct === "neutral"
                        ? "neutral"
                        : el.correct === "correct"
                        ? "correct"
                        : "incorrect"
                    }
                    key={i}
                    id={i}
                    maxLength="10"
                  >
                    {el.letter}
                  </span>
                );
              })}
            </p>
            {typingMode === 1 ? (
              <span className="author">- {author}</span>
            ) : null}
          </div>
          <div className="inputDiv">
            <input
            ref={inputRef}
              type="text"
              className="inputBar"
              onChange={textValidate}
            />
            <Link to={linkTarget} reloadDocument className="linkReset">
                <button className='resetButton'>
                    Reset
                </button>
            </Link>
          </div>
        </div>
      </>
    )
  ;
}
