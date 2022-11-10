import { useEffect, useState, useRef, ClipboardEvent } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import Data from './data'
import Bar from "./choiceBar.jsx";
import APIservice from "../APIService/index";
import "../css/main-page.css";

export default function Main() {
  const navigate = useNavigate();
  const { wordAmount, setWordAmount } = useOutletContext();
  const { incorrect, setIncorrect } = useOutletContext();
  const { setSpeed } = useOutletContext();
  const { typingMode, setTypingMode } = useOutletContext();
  const [checkFirstInput, setCheckInput] = useState(0);
  const { text, setText } = useOutletContext();
  const { author, setAuthor } = useOutletContext();
  const { reset, setReset } = useOutletContext();


  const inputRef = useRef(null);

  useEffect(() => {
    window.addEventListener("keydown", focus);
    inputRef.current.value = "";
    setCheckInput(0)
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

  //TODO: strict mode/not strict
  //STRICT: not allow user to proceed UNTIL you get the current word right // NOT STRICT: allow them to go back and fix but after you get the WORD right
  //TODO: problem with input logic, should stop validating any future values if one is incorrect
  //perhaps you can add logic that whenever a spacebar is pressed, you add


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
      }
    }

    if (text[e.target.value.length + 1]) {
      text[e.target.value.length].correct = "neutral";
    } 

    setText([...text]);

    if (e.target.value.length === text.length) {
      const currentTime = new Date();
      for (let obj of text) {
        console.log(obj);
        for (let key in obj) {
          console.log(key);
          if (obj[key] === "incorrect") {
            setIncorrect((incorrect) => (incorrect += 1));
          }
        }
      }
      setSpeed((time) => currentTime - time);

      navigate("/stats");
    }
  }

  return (
    { text } && (
      <>
        <div className="Main-container">
          <Bar changeWordAmount={changeWordAmount} setCheckInput={setCheckInput} />
          <div
            className="typing-container"
            onClick={focus}
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
            {typingMode === 1 ? 
            <span className="author">
            - {author}
            </span>
            : null}
          </div>
          <div className="inputDiv">
          <input
            ref={inputRef}
            type="text"
            className="inputBar"
            onChange={textValidate}
          />
          <button className="resetButton" onClick={() => setReset(num => num= num+1)}> Reset </button>
          </div>
          <Data></Data>
        </div>

      </>
    )
  );
}
