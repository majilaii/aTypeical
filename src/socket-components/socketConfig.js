import io from "socket.io-client"
const socket = io.connect('http://localhost:3001')

socket.on('message', msg => console.log(msg))


export default socket