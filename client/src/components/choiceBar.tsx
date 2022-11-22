import '../css/choiceBar.css';
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import APIservice from '../APIService/index';

export default function Bar({ setCheckInput }: { setCheckInput: any }) {
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
  } = useOutletContext() as any;

  useEffect(() => {
    if(wordAmount > 5){
      localStorage.setItem('wordAmount', JSON.stringify(wordAmount))
      localStorage.setItem('typingMode', JSON.stringify(typingMode))
      localStorage.setItem('KEnglish', JSON.stringify(KEnglish))
    }
  }, [KEnglish, typingMode, wordAmount])

  useEffect(() => {
    if(localStorage.getItem('typingMode') !== null) {
      setWordAmount(JSON.parse(localStorage.getItem('wordAmount')))
      setKEnglish(JSON.parse(localStorage.getItem('KEnglish')))
      setTypingMode(JSON.parse(localStorage.getItem('typingMode')))
    }
  })

  useEffect(() => {
    wordOrQuote(localStorage.getItem('wordAmount') !== null ? JSON.parse(localStorage.getItem('wordAmount')) : 15, typingMode);
  }, [typingMode, KEnglish]);

  async function getQuotes(length: number) {
    const data = await APIservice.FetchQuotes(length);
    let quote = data.content.split('');
    quote = quote.map((letter: string) => {
      return { letter: letter, correct: 'neutral', active: 'false' };
    });
    setText(quote);
    setAuthor(data.author);
  }

  async function getWords(num: number) {
    const data = await APIservice.fetchEnglishK(KEnglish, num);
    setText(data);
  }

  async function wordOrQuote(chars: number, quote = false) {
    console.log({quote, typingMode});
    if (quote) {
      getQuotes(chars);
    } else {
      setWordAmount(chars);
      getWords(chars);
    }
    setCheckInput(0);
    setReset((num: number) => (num = num + 1));
  }

  return (
    <div className="choiceBar">
      <button onClick={() => setTypingMode(false)}> WORDS </button>
      <button onClick={() => setTypingMode(true)}> QUOTE </button>
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
