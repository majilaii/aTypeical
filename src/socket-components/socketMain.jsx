import './css/socketMain.css'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import io from "socket.io-client"
const socket = io.connect('http://localhost:3001')


export default function SocketMain() {
    const {text, setText} = useOutletContext()




    function sendMessage() {
        socket.emit("send_message", {message:"Hello"})
    }

    return(
        <div className="SocketContainer">
            <input type="text" />
            <button onClick={sendMessage}> Send Message ig</button>
        </div>
    )
}
