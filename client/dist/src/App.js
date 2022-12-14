import './App.css';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/nav-bar';
// TODO refactor to Redux (if have time)
function App() {
    // TODO replace 0-1 with booleans
    var _a = useState(localStorage.getItem('wordAmount') !== null ? JSON.parse(localStorage.getItem('wordAmount')) : 15), wordAmount = _a[0], setWordAmount = _a[1];
    var _b = useState(0), speed = _b[0], setSpeed = _b[1];
    var _c = useState([]), text = _c[0], setText = _c[1];
    var _d = useState(0), incorrect = _d[0], setIncorrect = _d[1];
    var _e = useState(1), KEnglish = _e[0], setKEnglish = _e[1];
    var _f = useState(localStorage.getItem('typingMode') !== null ? JSON.parse(localStorage.getItem('typingMode')) : false), typingMode = _f[0], setTypingMode = _f[1];
    var _g = useState(null), author = _g[0], setAuthor = _g[1];
    var _h = useState(true), reset = _h[0], setReset = _h[1];
    var _j = useState([]), prevInputLength = _j[0], setPrevInputLength = _j[1];
    var _k = useState([]), adjustedWPM = _k[0], setAdjustedWPM = _k[1];
    var _l = useState(false), isAuthenticated = _l[0], setIsAuthenticated = _l[1];
    var _m = useState(null), gameState = _m[0], setGameState = _m[1];
    return (React.createElement("div", { className: 'wholeContainer' },
        React.createElement(NavBar, { isAuthenticated: isAuthenticated, setIsAuthenticated: setIsAuthenticated }),
        React.createElement(Outlet, { context: {
                gameState: gameState,
                setGameState: setGameState,
                wordAmount: wordAmount,
                setWordAmount: setWordAmount,
                speed: speed,
                setSpeed: setSpeed,
                text: text,
                setText: setText,
                incorrect: incorrect,
                setIncorrect: setIncorrect,
                KEnglish: KEnglish,
                setKEnglish: setKEnglish,
                typingMode: typingMode,
                setTypingMode: setTypingMode,
                author: author,
                setAuthor: setAuthor,
                reset: reset,
                setReset: setReset,
                prevInputLength: prevInputLength,
                setPrevInputLength: setPrevInputLength,
                adjustedWPM: adjustedWPM,
                setAdjustedWPM: setAdjustedWPM,
                isAuthenticated: isAuthenticated,
                setIsAuthenticated: setIsAuthenticated,
            } })));
}
export default App;
