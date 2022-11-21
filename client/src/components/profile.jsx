import { useState, useEffect } from 'react';
import '../css/profile.css';
import { useOutletContext, useNavigate } from 'react-router-dom';
import APIservice from '../APIService';
import Session from '../profile-components/training-history';

export default function Profile() {
  // TODO move to context (or Redux)
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [history, setHistory] = useState([]);
  const { isAuthenticated, setIsAuthenticated } = useOutletContext();
  const [totalTime, setTotalTIme] = useState(0);
  const [totalLetters, setTotalLetters] = useState(0);
  const [totalWPM, setTotalWPM] = useState(0);
  const [totalRawWPM, setTotalRawWPM] = useState(0);
  const [totalAccuracy, setTotalAccuracy] = useState(0);

  useEffect(() => {
    const getProfile = async () => {
      const userInfo = await APIservice.profile();
      if (userInfo) {
        const { username, password, created, history } = userInfo;
        setUsername(username);
        setIsAuthenticated(true);
        setHistory(history);
        let counter = 0;
        let timeCounter = 0;
        let rawWPM = 0;
        let wpm = 0;
        let accuracy = 0;
        if (history.length) {
          history.forEach((el) => {
            counter += el.textLength;
            timeCounter += el.time;
            rawWPM += el.rawwpm;
            wpm += el.wpm;
            accuracy += el.accuracy;
          });
        }
        setTotalTIme(timeCounter);
        setTotalLetters(counter);
        setTotalRawWPM(rawWPM);
        setTotalWPM(wpm);
        setTotalAccuracy(accuracy);
      } else {
        navigate('/register');
      }
    };
    getProfile();
  }, []);

  return (
    <div className='profileContainer'>
      <div className='userInfo'>
        <h1> Welcome Back, </h1>

        <div className='names'>
          <div id='welcomeUsername' className='typed-out'> {username} </div>
        </div>

        <div className='totalStats'>
          <div className='totalTests groupedStats'>
            <div className='title'> Total Tests Completed: </div>
            <div className='val'> {history.length} </div>
          </div>
          <div className='totalTimeTyped groupedStats'>
            <div className='title'> Total Typing Time: </div>
            <div className='val'> {totalTime.toFixed(2)}s </div>
          </div>
          <div className='totalLettersTyped groupedStats'>
            <div className='title'>Total Letters Typed: </div>
            <div className='val'> {totalLetters} </div>
          </div>

          <div className='averageWPM groupedStats'>
            <div className='title'>Average WPM:</div>
            <div className='val'>
              {' '}
              {(totalWPM / history.length).toFixed(1)}{' '}
            </div>
          </div>
          <div className='averageRaw groupedStats'>
            <div className='title'> Average Raw:</div>
            <div className='val'>
              {' '}
              {(totalRawWPM / history.length).toFixed(1)}{' '}
            </div>
          </div>
          <div className='averageAccuracy groupedStats'>
            <div className='title'>Average Accuracy:</div>
            <div className='val'>
              {' '}
              {(totalAccuracy / history.length).toFixed(1)}%
            </div>
          </div>
        </div>

        <div className='bottomSpacer'> </div>
      </div>
      {history.length > 0 ? (
        <div className='trainingHistory'>
          <p className='history'> History </p>
          <table className='tablelol'>
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
        <div className='NoMatches'> PLAY A GAME </div>
      )}
    </div>
  );
}
