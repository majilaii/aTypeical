import { useState, useRef, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { fetchQuotes } from '../APIService/index'
import "../css//choiceBar.css";

export default function Bar({ changeWordAmount }) {
  const { wordAmount, setWordAmount } = useOutletContext();
  const { KEnglish, setKEnglish } = useOutletContext();

    
  
  return (
    <div className="choiceBar">
      <button onClick={() => changeWordAmount(50)}> WORDS </button>
      <button onClick={() => changeWordAmount(50)}> TIME </button>
      <button onClick={() => fetchQuotes()}> QUOTE </button>
      <div className="spacer"></div>
      <button onClick={() => changeWordAmount(100)}> SCHLONGGGG </button>
      <button onClick={() => changeWordAmount(50)}> THICC </button>
      <button onClick={() => changeWordAmount(30)}> SHORT </button>
      <div className="spacer"></div>
      <button onClick={() => setKEnglish(10)}> HARD </button>
      <button onClick={() => setKEnglish(1)}> EASY </button>
      <button onClick={() => setKEnglish(5)}> MEDIUM </button>
    </div>
  );
}
