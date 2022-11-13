import "../css/training-history.css";
import moment from "moment";
import { useState, useEffect } from "react";

export default function Session({ element }) {
    function whatMode(typing, english) {
        if (typing === 0) {
            return 'Word'
          }
          if (typing === 1) {
            return 'Quotes'
          }

          if (english === 1) {
            return '1K'
          }
          if (english === 5) {
            return '5K'
          }
          if(english === 10) {
            return '10K'
          }


    }
  return (
    <>
      <tr className="session">
        <td>
            {element.wpm}
        </td>
        <td>
            {(element.rawwpm)}
        </td>

        <td>
            {element.accuracy.toFixed(1)}
        </td>

        <td>
            {element.textLength}/{element.incorrect}
        </td>

        <td>
            {whatMode(element.typingMode)}/{element.wordAmount}/{whatMode(null, element.KEnglish)}
        </td>

        <td>
        {moment(element.date).format("MMMM Do YYYY, h:mm:ss a")}
        </td>
      </tr>
    </>
  );
}
