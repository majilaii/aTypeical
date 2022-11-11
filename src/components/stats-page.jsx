import "../css/stats-page.css";
import { useEffect, useState } from "react";
import { useOutletContext, useNavigate, Link } from "react-router-dom";

import Data from "./data";

export function CalculateRawWPM(text, speed) {
  return Math.round(text.length / 5 / (speed / 1000 / 60));
}

export default function Stats() {
  const { text, setText } = useOutletContext();
  const { speed, setSpeed } = useOutletContext();
  const { incorrect, setIncorrect } = useOutletContext();
  const linkTarget = {
    pathname: "/",
    key: Math.random(), 
    state: {
      applied: true
    }
}
const LoginTarget = {
  pathname: "/register",
  key: Math.random(), // we could use Math.random, but that's not guaranteed unique.
  state: {
    applied: true
  }
}
console.log(text)
console.log(incorrect)
console.log(((text.length - (incorrect/ 5))) / (speed / 1000 / 60))
  const adjustedWPM = CalculateRawWPM(text, speed) - ((incorrect) / speed/1000/60)
  ;

  return (
    <>
      <div className="statsContainer">
        <p className="stats">
            <span className="description"> Time: </span>
            {(speed / 1000).toFixed(2)}
        <br/>
        <span className="otherTime">{new Date(speed).toISOString().slice(11, 19)} duration</span>
        </p >
        <p className="stats">
        <span className="description"> Raw WPM: </span>
            {CalculateRawWPM(text, speed)}
            <br/>
            </p>
        <p className="stats">
        <span className="description"> WPM: </span>
            {adjustedWPM < 0 ? 0 : adjustedWPM}
            </p>
            <p className="stats">
        <span className="description"> Accuracy: </span>
            { (100*(text.length - incorrect) / text.length).toFixed(2)}%
            </p>
      </div>
      <Data></Data>
      <Link to={linkTarget} reloadDocument className="linkReset">
      <img className="icon" src="https://htmlacademy.ru/assets/icons/reload-6x-white.png"></img>
      </Link>
      
      <p className="loginMessage"> <Link to={LoginTarget} className="linkLogin">log in  </Link> to save results </p>
 
    </>
  );
}
