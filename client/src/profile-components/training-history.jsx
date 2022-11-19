import { DateTime } from 'luxon';

export default function Session({ element }) {
  function whatMode(typing, english) {
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
          {whatMode(element.typingMode)}/{element.wordAmount}/
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
