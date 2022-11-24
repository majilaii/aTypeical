import { DateTime } from 'luxon';
import React from 'react';
import { updateUser } from '../APIService';

export default function Session({ element }: { element: updateUser & {
  wpm: number,
  rawwpm: number,
  accuracy: number,
  textLength: number,
  typingMode: 'WORDS' | 'QUOTES',
  date: string
}}) {
  function whatMode(typing: 'WORDS' | 'QUOTES', difficultyLevel: 'EASY' | 'MEDIUM' | 'HARD') {
    if (typing === 'WORDS') return 'Word';
    if (typing === 'QUOTES') return 'Quotes';
    
    return difficultyLevel;
  }
  return (
    <>
      <tr className='session'>
        <td>{element.wpm}</td>
        <td>{element.rawwpm}</td>

        <td>{element.accuracy.toFixed(1)}</td>

        <td>
          {element.textLength}/{element.incorrect}
        </td>

        <td>
          {whatMode(element.typingMode, element.difficulty)}/{element.wordAmount}/
          {whatMode(null, element.difficulty)}
        </td>

        <td>
          {DateTime.fromISO(element.date).toLocaleString(DateTime.DATE_MED)}
          <br />
          {DateTime.fromISO(element.date).toLocaleString(DateTime.TIME_24_WITH_SECONDS)}
        </td>
      </tr>
    </>
  );
}
