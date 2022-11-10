import '../css/stats-page.css'
import { useEffect, useState } from 'react'
import { useOutletContext, useNavigate } from "react-router-dom";


export default function Stats () {
    const {text, setText} = useOutletContext();
    const {speed, setSpeed} = useOutletContext()
    const {incorrect, setIncorrect} = useOutletContext()
    const [detailedSpeed, setDetailedSpeed] = useState(speed)

    function CalculateRawWPM(text, speed) {
        return Math.round((text.length/5)/(speed/1000/60))
    }

    
    return <div>
         <p>{Math.round(speed/1000)} ur wpm is trash</p>
         <p>{new Date(speed).toISOString().slice(11, 19)}</p>
         <p>{CalculateRawWPM(text, speed)}</p>
         <p>{Math.round(((text.length -incorrect)/5)/(speed/1000/60)) < 0 ? 0 : Math.round(((text.length -incorrect)/5)/(speed/1000/60)) }</p>
         </div>
}