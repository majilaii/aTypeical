import { DateTime } from 'luxon';
import React from 'react';
export default function Session(_a) {
    var element = _a.element;
    function whatMode(typing, english) {
        if (typing === false)
            return 'Word';
        if (typing === true)
            return 'Quotes';
        if (english === 1)
            return '1K';
        if (english === 5)
            return '5K';
        if (english === 10)
            return '10K';
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("tr", { className: 'session' },
            React.createElement("td", null, element.wpm),
            React.createElement("td", null, element.rawwpm),
            React.createElement("td", null, element.accuracy.toFixed(1)),
            React.createElement("td", null,
                element.textLength,
                "/",
                element.incorrect),
            React.createElement("td", null,
                whatMode(element.typingMode, element.KEnglish),
                "/",
                element.wordAmount,
                "/",
                whatMode(null, element.KEnglish)),
            React.createElement("td", null,
                DateTime.fromISO(element.date).toLocaleString(DateTime.DATE_MED),
                React.createElement("br", null),
                DateTime.fromISO(element.date).toLocaleString(DateTime.TIME_24_WITH_SECONDS)))));
}
