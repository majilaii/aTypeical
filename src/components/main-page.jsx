import { useEffect, useState, useRef, ClipboardEvent } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

import Bar from "./choiceBar.jsx";
import { shuffle } from "../APIService/index";
import "../css/main-page.css";

export default function Main() {
  const navigate = useNavigate();
  const { wordAmount, setWordAmount } = useOutletContext();
  const { incorrect, setIncorrect } = useOutletContext();
  const { setSpeed } = useOutletContext();
  const { KEnglish, setKEnglish } = useOutletContext();
  const [checkFirstInput, setCheckInput] = useState(0);
  // const [time, setTime] = useState(0)
  const { text, setText } = useOutletContext();
  const inputRef = useRef(null);

  async function fetchEnglishK(num) {
    let Words = await fetch(`http://localhost:3000/${num}k.txt`);
    let final = await Words.text();
    final = shuffle(final.split(" ")).slice(0, wordAmount).join(" ").split("");

    final = final.map((letter) => {
      return { letter: letter, correct: "neutral", active: "false" };
    });

    setText(final);
  }

  useEffect(() => {
    fetchEnglishK(KEnglish);
    window.addEventListener("keydown", focus);
    inputRef.current.value = "";
  }, [wordAmount, KEnglish]);

  const preventCopyPaste = (e) => {
    e.preventDefault();
  };

  function focus() {
    inputRef.current.focus();
  }

  function changeWordAmount(num) {
    setWordAmount(num);
  }

  //   function checkWordComplete(e) {
  //     if(e.key === 'Backspace') {

  //     }
  //   }
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
      text[e.target.value.length + 1].correct = "neutral";
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
          <Bar changeWordAmount={changeWordAmount} />
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
          </div>
          <input
            ref={inputRef}
            type="text"
            className="inputBar"
            onChange={textValidate}
          />
        </div>
      </>
    )
  );
}
