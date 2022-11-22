import './css/Word.css';
import React from 'react';

export default function Word({
  element,
  listID,
  activeWordIndex,
  wrong,
}: {
  element: any,
  listID: any,
  activeWordIndex: any,
  wrong: any
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
