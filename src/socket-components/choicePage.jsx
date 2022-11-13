import './css/choicePage.css'
import APIservice from '../APIService'
import { useState } from 'react'


export default function ChoicePage() {
    const [socketKEng, setSocketKEng] = useState(5)
    // APIservice.fetchEnglishWords()
    return (
        <div className="choiceContainer">
            <div className="joinRoom">


            </div>
            <div className="spacer">
                
            </div>
            <div className="inviteFriend">



            </div>
        </div>
    )
}