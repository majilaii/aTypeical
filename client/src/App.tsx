import './App.css';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/nav-bar';

// TODO refactor to Redux (if have time)
function App() {
  // TODO replace 0-1 with booleans
  const [wordAmount, setWordAmount] = useState(localStorage.getItem('wordAmount') !== null ? JSON.parse(localStorage.getItem('wordAmount')) : 15);
  const [speed, setSpeed] = useState(0);
  const [text, setText] = useState([]);
  const [incorrect, setIncorrect] = useState(0);
  const [KEnglish, setKEnglish] = useState(1);
  // const [typingMode, setTypingMode] = useState(localStorage.getItem('typingMode') !== null ? JSON.parse(localStorage.getItem('typingMode')) : false);
  const [author, setAuthor] = useState(null);
  const [prevInputLength, setPrevInputLength] = useState([]);
  const [adjustedWPM, setAdjustedWPM] = useState([]);
  const [gameState, setGameState] = useState(null);


  return (
    <div className='wholeContainer'>
      <NavBar/>
      <Outlet
        context={{
          gameState,
          setGameState,
          wordAmount,
          setWordAmount,
          speed,
          setSpeed,
          text,
          setText,
          incorrect,
          setIncorrect,
          KEnglish,
          setKEnglish,
          // typingMode,
          // setTypingMode,
          author,
          setAuthor,
          prevInputLength,
          setPrevInputLength,
          adjustedWPM,
          setAdjustedWPM
        }}
      />
    </div>
  );
}
export default App;
