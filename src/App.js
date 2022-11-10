import './App.css';
import { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import Main from './components/main-page'
import NavBar from './components/nav-bar'
import { useOutletContext } from "react-router-dom";

function App() {
  const [wordAmount, setWordAmount] = useState(5)
  const [speed, setSpeed] = useState(0)
  const [text, setText] = useState([]);
  const [incorrect, setIncorrect] = useState(0)
  const [KEnglish, setKEnglish] = useState(1)
  return (
    <div className='wholeContainer'>
    <NavBar/>
    <Outlet context={{wordAmount, setWordAmount, speed, setSpeed, text, setText,  incorrect, setIncorrect, KEnglish, setKEnglish}}/>
    </div>
  )
}
export default App;
