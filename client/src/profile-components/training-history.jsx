import '../css/training-history.css';
// TODO replace moment with Luxon or JS Date
import moment from 'moment';

export default function Session({ element }) {
  function whatMode(typing, english) {
    // TODO typing could be a boolean (needs a better name as well)
    if (typing === 0) {
      return 'Word';
    }
    if (typing === 1) {
      return 'Quotes';
    }

    // TODO string intepolation
    if (english === 1) {
      return '1K';
    }
    if (english === 5) {
      return '5K';
    }
    if (english === 10) {
      return '10K';
    }
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
          {moment(element.date).format('MMM Do YY')}
          <br />
          {moment(element.date).format('h:mm:ss')}
        </td>
      </tr>
    </>
  );
}