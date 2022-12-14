import { DateTime } from 'luxon';
import React from 'react';
import { updateUser } from '../APIService';

export default function Session({ element }: { element: updateUser & {
  wpm: number,
  rawwpm: number,
  accuracy: number,
  textLength: number,
  typingMode: boolean,
  date: string
}}) {
  function whatMode(typing: boolean, english: number) {
    if (typing === false) return 'Word';
    if (typing === true) return 'Quotes';

    if (english === 1) return '1K';
    if (english === 5) return '5K';
    if (english === 10) return '10K';
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
          {whatMode(element.typingMode, element.KEnglish)}/{element.wordAmount}/
          {whatMode(null, element.KEnglish)}
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
