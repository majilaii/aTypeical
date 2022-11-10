import "../css/stats-page.css";
import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import Data from "./data";

export function CalculateRawWPM(text, speed) {
  return Math.round(text.length / 5 / (speed / 1000 / 60));
}

export default function Stats() {
  const { text, setText } = useOutletContext();
  const { speed, setSpeed } = useOutletContext();
  const { incorrect, setIncorrect } = useOutletContext();

  const adjustedWPM = Math.round(
    (text.length - incorrect) / 5 / (speed / 1000 / 60)
  );

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
      </div>
      <Data></Data>
    </>
  );
}
