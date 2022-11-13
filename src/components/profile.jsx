import { useState, useEffect } from "react";
import "../css/profile.css";
import { useOutletContext, useNavigate } from "react-router-dom";
import APIservice from "../APIService";
import Session from "../profile-components/training-history";

export default function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [history, setHistory] = useState([]);
  const { isAuthenticated, setIsAuthenticated } = useOutletContext();
  const [totalTime, setTotalTIme] = useState(0)
  const [totalLetters, setTotalLetters] = useState(0)

 

  useEffect(() => {
    const getProfile = async () => {
      const userInfo = await APIservice.profile();
      if (userInfo) {
        const { username, password, createdAt, history } = userInfo;
        setUsername(username);
        setIsAuthenticated(true);
        setHistory(history);
        let counter = 0 
        let timeCounter = 0
        if(history.length){
          history.forEach((el) => {
            console.log(el.time)
            counter += el.textLength
            timeCounter += el.time
          })
        }
        console.log(timeCounter)
        setTotalTIme(timeCounter)
        setTotalLetters(counter)
      } else {
        navigate("/register");
      }
    };
    getProfile();
  }, []);


  return (
    <div className="profileContainer">
      <div className="userInfo">
        <h1> Welcome Back, </h1>
        <div className="names">
          <div className="typed-out"> {username} </div>
        </div>
        <div className="totalStats">
          <p className="totalTimeTyped">Total Typing Time: {totalTime.toFixed(2)}</p>
          <p className="totalLettersTyped"> Total Letters Typed: {totalLetters} </p>
          <p className="timecreated"> created at: June 4th 2022 </p>
        </div>
      </div>
      {history.length > 0 ? (
        <div className="trainingHistory">

          <table className="tablelol">
            <thead>
            <tr>
              <th>wpm</th>
              <th>raw</th>
              <th>accuracy</th>
              <th>letters/incorrects</th>
              <th>mode</th>
              <th>date</th>
            </tr>
            </thead>

            <tbody>
            {history.map((element, index) => {
              return <Session key={index} element={element} />;
            })}
            </tbody>
          
          </table>
        </div>
      ) : (
        <div className="NoMatches"> PLAY A GAME MORON </div>
      )}
    </div>
  );
}
