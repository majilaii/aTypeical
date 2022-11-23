import '../css/choiceBar.css';
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import APIservice from '../APIService/index';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import typing from '../redux/actions/typingMode';

export default function Bar({ setCheckInput }: { setCheckInput: any }) {
  const {reset, typingMode} = useAppSelector<{reset: boolean, typingMode: 'QUOTES' | 'WORDS'}>((state) => {
    return {
      reset: state.resetReducer.reset,
      typingMode: state.typingModeReducer.typingMode
    }
  }); 
  const dispatch = useAppDispatch();
  const {
    wordAmount,
    setWordAmount,
    KEnglish,
    setKEnglish,
    // typingMode,
    // setTypingMode,
    setText,
    setAuthor,
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
      dispatch(typing.setTypingMode(JSON.parse(localStorage.getItem('typingMode'))))
    }
  }, [dispatch, setKEnglish, setWordAmount])

  useEffect(() => {
    wordOrQuote(localStorage.getItem('wordAmount') ? JSON.parse(localStorage.getItem('wordAmount')) : 15, typingMode);
  }, [typingMode, KEnglish, reset]);

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

  async function wordOrQuote(chars: number, quote = 'WORDS') {
    if (quote === 'QUOTES') {
      getQuotes(chars);
    } else {
      setWordAmount(chars);
      getWords(chars);
    }
    setCheckInput(0);
  }

  return (
    <div className="choiceBar">
      <button onClick={() => dispatch(typing.words())}> WORDS </button>
      <button onClick={() => dispatch(typing.quotes())}> QUOTE </button>
      <div className="spacer"></div>

      <button onClick={() => typingMode ? wordOrQuote(250, 'QUOTES') : wordOrQuote(100)}> THICC </button>
      <button onClick={() => typingMode ? wordOrQuote(150, 'QUOTES') : wordOrQuote(50)}> LONG </button>
      <button onClick={() => typingMode ? wordOrQuote(30, 'QUOTES') : wordOrQuote(20)}> SHORT </button>

      {typingMode === 'WORDS' && (
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
