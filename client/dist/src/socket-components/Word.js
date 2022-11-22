import './css/Word.css';
import React from 'react';
export default function Word(_a) {
    var element = _a.element, listID = _a.listID, activeWordIndex = _a.activeWordIndex, wrong = _a.wrong;
    return (React.createElement("div", { className: "".concat(listID === activeWordIndex && wrong === true
            ? 'current word wrong '
            : listID === activeWordIndex
                ? 'current word '
                : 'word') }, element));
}
