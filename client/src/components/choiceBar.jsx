import '../css/choiceBar.css';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import APIservice from '../APIService/index';

export default function Bar({ setCheckInput }) {
  const {
    wordAmount,
    setWordAmount,
    KEnglish,
    setKEnglish,
    typingMode,
    setTypingMode,
    setText,
    setAuthor,
    setReset,
  } = useOutletContext();

  // TODO review these LOCAL STORAGE
  // useEffect(() => {
  //   if(wordAmount > 5){
  //     localStorage.setItem('wordAmount', JSON.stringify(wordAmount))
  //     localStorage.setItem('typingMode', JSON.stringify(typingMode))
  //     localStorage.setItem('KEnglish', JSON.stringify(KEnglish))
  //   }
  // }, [KEnglish, typingMode, wordAmount])

  // useEffect(() => {
  //   if(localStorage.getItem('typingMode') !== null) {
  //     setWordAmount(JSON.parse(localStorage.getItem('wordAmount')))
  //     setKEnglish(JSON.parse(localStorage.getItem('KEnglish')))
  //     setTypingMode(JSON.parse(localStorage.getItem('typingMode')))
  //   }
  // },[])

  useEffect(() => {
    wordOrQuote(15);
  }, [typingMode, KEnglish]);

  async function getQuotes(length) {
    const data = await APIservice.FetchQuotes(length);
    let quote = data.content.split('');
    quote = quote.map((letter) => {
      return { letter: letter, correct: 'neutral', active: 'false' };
    });
    setText(quote);
    setAuthor(data.author);
  }

  async function getWords(num) {
    const data = await APIservice.fetchEnglishK(KEnglish, num);
    setText(data);
  }

  async function wordOrQuote(chars, quote = false) {
    if (quote) {
      getQuotes(chars);
    } else {
      setWordAmount(chars);
      getWords(chars);
    }
    setCheckInput(0);
    setReset((num) => (num = num + 1));
  }

  return (
    <div className="choiceBar">
      <button onClick={() => setTypingMode(0)}> WORDS </button>
      <button onClick={() => setTypingMode(1)}> QUOTE </button>
      <div className="spacer"></div>

      <button onClick={() => typingMode ? wordOrQuote(250, true) : wordOrQuote(100)}> THICC </button>
      <button onClick={() => typingMode ? wordOrQuote(150, true) : wordOrQuote(50)}> LONG </button>
      <button onClick={() => typingMode ? wordOrQuote(30, true) : wordOrQuote(20)}> SHORT </button>

      {typingMode === 0 && (
        <>
          <div className="spacer"></div>
          <div className="fadeIn">
            <button onClick={() => setKEnglish(10)}> HARD </button>
            <button onClick={() => setKEnglish(5)}> MEDIUM </button>
            <button onClick={() => setKEnglish(1)}> EASY </button>
          </div>
        </>
      )}
    </div>
  );
}
