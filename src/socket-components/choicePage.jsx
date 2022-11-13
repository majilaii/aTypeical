import "./css/choicePage.css";
import APIservice from "../APIService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChoicePage() {
    const navigate = useNavigate()
  const [socketKEng, setSocketKEng] = useState(5);
  // APIservice.fetchEnglishWords()

  function makeRoom() {
    navigate('/socket')
  }

  
  return (
    <div className="choiceContainer">
      <div className="joinRoom">
        <div className="roomContainer">
          <input type="text" className="email" />
          <button className="submit"> JOIN ROOM</button>
        </div>
      </div>
        <div className="spacer raceSpacer"></div>
      <div className="inviteFriend">
        <div className="makeRoom">
        <button className="submit" onClick={makeRoom} > MAKE ROOM </button>
        </div>
      </div>
    </div>
  );
}
