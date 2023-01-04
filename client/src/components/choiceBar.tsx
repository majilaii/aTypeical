import '../css/choiceBar.css';
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import APIservice from '../APIService/index';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import typing from '../redux/actions/typingMode';
import difficultyActions from '../redux/actions/difficulty';

export default function Bar({ setCheckInput }: { setCheckInput: any }) {
  const {reset, typingMode, difficulty} = useAppSelector<{reset: boolean, typingMode: 'QUOTES' | 'WORDS', difficulty: 'EASY' | 'MEDIUM' | 'HARD'}>((state) => {
    return {
      reset: state.resetReducer.reset,
      typingMode: state.typingModeReducer.typingMode,
      difficulty: state.difficultyReducer.difficulty
    }
  }); 
  const dispatch = useAppDispatch();
  const {
    wordAmount,
    setWordAmount,
    setText,
    setAuthor,
  } = useOutletContext() as any;

  useEffect(() => {
    if(wordAmount > 5){
      localStorage.setItem('wordAmount', JSON.stringify(wordAmount))
      localStorage.setItem('typingMode', JSON.stringify(typingMode))
      localStorage.setItem('difficulty', JSON.stringify(difficulty))
    }
  }, [difficulty, typingMode, wordAmount])

  useEffect(() => {
    if(localStorage.getItem('typingMode') !== null) {
      setWordAmount(JSON.parse(localStorage.getItem('wordAmount')))
      dispatch(difficultyActions.setDifficulty(JSON.parse(localStorage.getItem('difficulty'))))
      dispatch(typing.setTypingMode(JSON.parse(localStorage.getItem('typingMode'))))
    }
  }, [dispatch, setWordAmount])

  useEffect(() => {
    wordOrQuote(localStorage.getItem('wordAmount') ? JSON.parse(localStorage.getItem('wordAmount')) : 15, typingMode);
  }, [typingMode, difficulty, reset]);

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
    const data = await APIservice.fetchEnglishK(difficulty, num);
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
      <div className="choiceSection">
        <button onClick={() => dispatch(typing.words())}> WORDS </button>
        <button onClick={() => dispatch(typing.quotes())}> QUOTE </button>
      </div>
      <div className="spacer"></div>

      <div className="choiceSection">
        <button onClick={() => typingMode ? wordOrQuote(250, 'QUOTES') : wordOrQuote(100)}> THICC </button>
        <button onClick={() => typingMode ? wordOrQuote(150, 'QUOTES') : wordOrQuote(50)}> LONG </button>
        <button onClick={() => typingMode ? wordOrQuote(30, 'QUOTES') : wordOrQuote(20)}> SHORT </button>
      </div>

      {typingMode === 'WORDS' && (
        <>
          <div className="spacer"></div>
          <div className="fadeIn choiceSection">
            <button onClick={() => dispatch(difficultyActions.hard())}> HARD </button>
            <button onClick={() => dispatch(difficultyActions.medium())}> MEDIUM </button>
            <button onClick={() => dispatch(difficultyActions.easy())}> EASY </button>
          </div>
        </>
      )}
    </div>
  );
}
