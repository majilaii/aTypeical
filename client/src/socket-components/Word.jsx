import './css/Word.css';

export default function Word({
  element,
  listID,
  activeWordIndex,
  wrong,
}) {
  return (
    <div
      className={`${
        listID === activeWordIndex && wrong === true
          ? 'current word wrong '
          : listID === activeWordIndex
          ? 'current word '
          : 'word'
      }`}
    >
      {element}
    </div>
  );
}
